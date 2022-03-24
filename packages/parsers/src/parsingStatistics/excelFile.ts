import xlsx from 'xlsx'
import { ContentsSheet, DetailsSheet } from './sheet'

export default class ExcelFile {
	private readonly sheetNames: string[];

	private readonly workBook: xlsx.WorkBook;

	private readonly sheetsJson: xlsx.WorkSheet;

	constructor(
		readonly path: string,
	) {
		this.workBook = xlsx.readFile(path)
		this.sheetNames = this.workBook.SheetNames
		this.sheetsJson = this.workBook.Sheets
	}

	getContentsSheet(): ContentsSheet | undefined {
		const contentsSheetIndex = ContentsSheet.CONTENTS_SHEET_INDEX
		const contentsSheetName = this.sheetNames[contentsSheetIndex]
		if (contentsSheetName) {
			return new ContentsSheet(
				this.sheetsJson[contentsSheetName],
			)
		}
		return undefined
	}

	getDetailesSheets() {
		return this.sheetNames
			.filter((sheetName, i) => i !== ContentsSheet.CONTENTS_SHEET_INDEX)
			.map((sheetName) => new DetailsSheet(this.sheetsJson[sheetName]))
	}

	getDetailsSheet(index: number) {
		return this.getDetailesSheets()[index]
	}
}
