import xlsx from 'xlsx'
import _ from 'lodash'
import removeExtraSpaces from '../helpers/removeExtraSpaces'
import Helpers from './helpers'

interface ContentsTree {
	orderNumber: string,
	sheetTitle: string | undefined,
	children: ContentsTree[],
}

export class Sheet extends Helpers {
	constructor(
		// eslint-disable-next-line no-unused-vars
		protected readonly sheetsJson: xlsx.WorkSheet,
	) {
		super()
	}

	getSheetLines() {
		const sheetArray = xlsx.utils
			.sheet_to_json<(string | number | undefined)[]>(
				this.sheetsJson, { raw: true, header: 1 })
		const sheetLines = sheetArray
			.filter((sheetLine) => !!sheetLine)

		return sheetLines
	}

	getStringifiedSheetLines() {
		const deepStringify = (
			sheetArray: (string | number | undefined)[][],
		) => sheetArray.map(cellGroup => cellGroup.map(cell => cell?.toString()))

		return deepStringify(this.getSheetLines())
	}
}

export class ContentsSheet extends Sheet {
	static CONTENTS_SHEET_INDEX = 0;

	private orderNumberIsCorrect = (str: string) => str
		.match(/[0-9][0-9]?\.([0-9][0-9]?\.)?([0-9][0-9]?\.)?/g)

	private removeExtraCharacters = (str: string) => _.trim(
		str.replace(/[\r\n]/gm, ''),
	)

	getContentsMap() {
		const sheetLines = this.getStringifiedSheetLines()
		const contentsMap = new Map<string, string>()
		sheetLines.forEach((sheetLine) => {
			const orderNumber = sheetLine[0]
			const title = sheetLine[1]
			if (!!orderNumber && !!title && this.orderNumberIsCorrect(orderNumber)) {
				contentsMap.set(orderNumber, this.removeExtraCharacters(title))
			}
		})
		return contentsMap
	}

	getContentsTree() {
		const contentsMap = this.getContentsMap()
		const contentsMapArray = Array.from(contentsMap.keys())
		const contentsTree: ContentsTree[] = []

		contentsMapArray.forEach(contentsKey => {
			const nestingLvl = contentsKey.split('.').filter(number => Number.isInteger(parseInt(number, 10))).length
			if (nestingLvl === 2) {
				contentsTree.push({
					orderNumber: contentsKey,
					sheetTitle: contentsMap.get(contentsKey),
					children: [],
				})
			} else {
				contentsTree[contentsTree.length - 1].children
					.push({
						orderNumber: contentsKey,
						sheetTitle: contentsMap.get(contentsKey),
						children: [],
					})
			}
		})

		return contentsTree
	}
}

export class DetailsSheet extends Sheet {
	private readonly startYear = 1991;

	private readonly endYear = new Date().getFullYear();

	private readonly yearsRange = this.getRange(this.startYear, this.endYear);

	getYearsHeadersIndex() {
		const sheetLines = this.getSheetLines()
		const topHeadersIndex = sheetLines.findIndex(sheetLine => {
			const lineCellsAreYears = sheetLine
				.some(sheetCell => {
					if (!sheetCell) return false
					const cell = typeof sheetCell === 'string'
						? parseInt(sheetCell, 10) : sheetCell
					return this.yearsRange.includes(cell)
				})
			return lineCellsAreYears
		})
		return topHeadersIndex
	}

	getTopHeaders() {
		const headers = this.getSheetLines()[this.getYearsHeadersIndex()]
		if (headers) headers[0] = 'regionName'
		return headers
	}

	getCleanedUpSheet() {
		const SheetLinesWithCuttedHeaders = this.getSheetLines().splice(this.getYearsHeadersIndex())
		const topHeaders = this.getTopHeaders()
		// console.log({ topHeaders })

		const filteredData = SheetLinesWithCuttedHeaders.filter((cellGroup) => {
			const cellGroupLength = cellGroup.length
			return cellGroupLength === topHeaders?.length && !!cellGroup[0]
		})
		return filteredData
	}

	getDetailedData() {
		const data = this.getCleanedUpSheet().map(cellGroup => {
			const cellGroupCleanedUp = cellGroup.map(cell => {
				if (cell === '-') return null
				if (typeof cell === 'string') return removeExtraSpaces(cell)
				if (typeof cell === 'number') return Math.round(cell * 100) / 100
				return null
			})
			const yearsHeaders = this.getTopHeaders()
			if (yearsHeaders) {
				return this.getObjectFromTwoArrays(yearsHeaders, cellGroupCleanedUp)
			}
			return null
		})
		return data
	}

	getSheetMeasure() {
		const yearIndex = this.getYearsHeadersIndex()
		const sheetLines = this.getSheetLines()
		const measure = sheetLines[yearIndex - 1][0]
		const isMeaseExist = measure && `${measure}`.includes('(') && !parseInt(`${measure}`)
		return isMeaseExist ? `${measure}` : ''
	}
}
