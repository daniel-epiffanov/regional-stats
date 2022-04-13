/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import express from 'express'
import mongoose from 'mongoose'
import fs from 'fs'
import ExcelFile from './excelFile'
import StatisticsModel from '../mongooseModels/statistics'
// import MapCoordsModel from '../mongooseModels/mapCoords'
import removeExtraSpaces from '../helpers/removeExtraSpaces'

require('dotenv').config()

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// const file = new ExcelFile('src/statisticsSrcFiles/2021/Раздел 10 - Инвестиции.xlsx')

const files: ExcelFile[] = fs
	.readdirSync('./src/statisticsSrcFiles/2021/')
	.filter(fPath => !fPath.includes('~$'))
	.map((fPath: string) => new ExcelFile(`./src/statisticsSrcFiles/2021/${fPath}`))

// console.log({ files })
// console.log(files[0].path)
// console.log(files[0].getDetailsSheet(0).getDetailedData())
// console.log('success 19')

// const mainSections = fs.readdirSync('./src/statisticsSrcFiles/2021/').map((fPath: string) => {
// 	// console.log({ fPath })
// 	return ({ fullFilename: fPath, name: removeExtraSpaces(fPath.split(' -')[1]?.split('.')[0] || '') })
// }).filter(mainSection => !mainSection.fullFilename.includes('~$'))

// console.log({ regions })

const getRegionData = (file: ExcelFile) => {
	const { path } = file
	const fullFileName = path
	const name = removeExtraSpaces(path.split(' -')[1]?.split('.')[0] || '')

	const mainSection = { fullFileName, name }
	const neededFile = file // files.find(file => file.path.includes(mainSection.fullFilename))
	const subSectionsOrSheets = neededFile.getContentsSheet()?.getContentsTree()

	const contentsMap = neededFile.getContentsSheet()?.getContentsMap()

	const { size } = contentsMap

	const detailsSheets = new Array(size)
		.fill(0)
		.map((item, itemIndex) => neededFile.getDetailsSheet(itemIndex))
		.filter(item => !!item)
	const detailsSheetsDetailedData = detailsSheets
		.map((detailsSheet) => {
			const dd = detailsSheet.getDetailedData()
			return dd
		})
	// console.log({ subSectionsOrSheets })

	let sheetIndex = 0
	const _subsections = subSectionsOrSheets.map((tree) => {
		// if (i > 1) return

		const deatilsSheet = detailsSheets[sheetIndex]

		const measure = tree.children.length === 0 ? deatilsSheet.getSheetMeasure() : null

		const detailedData = detailsSheetsDetailedData[sheetIndex]
		const regions = detailedData.map(detailedDataItem => detailedDataItem.regionName)

		const regionsSubsections = regions.map((region) => {
			const neededYearsData = detailedData.find(detailedDataItem => detailedDataItem.regionName === region)
			const neededYearsDataEntries = neededYearsData ? Object.entries(neededYearsData) : null

			let childrenSheetIndex = sheetIndex

			const yearValuesData = (tree.children.length === 0 && neededYearsDataEntries) && neededYearsDataEntries
				.filter(neededYearsDataEntry => neededYearsDataEntry[0] !== 'regionName')
				.map(neededYearsDataEntry => ({
					year: parseInt(neededYearsDataEntry[0]),
					value: neededYearsDataEntry && neededYearsDataEntry[1] ? neededYearsDataEntry[1] : null,
				}))
				.filter(yearValue => typeof yearValue.value === 'number')


			const children = tree.children?.map((child, _i) => {
				const childDeatilsSheet = detailsSheets[childrenSheetIndex]
				const childNeededYearsData = detailsSheetsDetailedData[childrenSheetIndex].find(detailedData => detailedData.regionName === region)
				const childNeededYearsDataEntries = childNeededYearsData ? Object.entries(childNeededYearsData) : null

				const measure = childDeatilsSheet.getSheetMeasure()

				childrenSheetIndex += 1

				const childrenYearValuesData = childNeededYearsDataEntries && childNeededYearsDataEntries
					.filter(childNeededYearsDataEntry => childNeededYearsDataEntry[0] !== 'regionName')
					.map(childNeededYearsDataEntry => ({
						year: parseInt(childNeededYearsDataEntry[0]),
						value: (childNeededYearsDataEntry && childNeededYearsDataEntry[1]) ? childNeededYearsDataEntry[1] : null,
					}))
					.filter(yearValue => typeof yearValue.value === 'number')

				return ({
					orderNumber: child.orderNumber,
					name: child.sheetTitle,
					measure,
					yearValues: childrenYearValuesData || null,
					children: null,
				})
			})

			const r = ({
				region,
				subSectionData: {
					orderNumber: tree.orderNumber,
					name: tree.sheetTitle,
					measure,
					yearValues: yearValuesData || null,
					children: (children && children.length !== 0) ? children : null,
				},
			})

			return r
		})

		if (tree.children.length === 0) sheetIndex += 1
		else sheetIndex += tree.children.length

		// console.log({ regionsSubsections })

		return regionsSubsections
	})

	console.log({ _subsections })

	const mainSectionReturn = ({
		...mainSection,
		subSections: _subsections,
	})

	return mainSectionReturn
}

const getOnlyLettersLeft = (regionName: string) => regionName
	.replace(/Р/g, 'Р')
	.replace(/p/g, 'р')
	.replace(/[^а-яА-Я]/g, '')
	.toLocaleLowerCase()

const saveMainSection = async (file: ExcelFile) => {
	const mongoRegions = await StatisticsModel.distinct('regionName')
	console.log({ mongoRegions })

	const regionData = getRegionData(file)
	console.log({ regionData })
	const { fullFileName, name, subSections } = regionData

	for (let mongoRegionIndex = 0; mongoRegionIndex < mongoRegions.length; mongoRegionIndex += 1) {
		const mongoRegion = mongoRegions[mongoRegionIndex]

		console.log({ mongoRegion })

		const regionMainSection = {
			fullFileName,
			name,
			subSections: subSections.map((subSection) => {
				const neededSubSection = subSection.find(subSectionItem => {
					const clearedRegionName = getOnlyLettersLeft(subSectionItem.region)
					const clearedMongoRegionName = getOnlyLettersLeft(mongoRegion)
					return clearedRegionName === clearedMongoRegionName
						|| !!clearedMongoRegionName.match(clearedRegionName)
						|| !!clearedRegionName.match(clearedMongoRegionName)
				})
				// const neededSubSection = subSection[mongoRegionIndex]

				if (neededSubSection) {
					const { children, yearValues } = neededSubSection.subSectionData
					const filteredChildren = children?.filter(({ yearValues: childYearValues }) => {
						return !!childYearValues && Array.isArray(childYearValues) && childYearValues.length !== 0
					})

					if (children && children?.length !== filteredChildren?.length) {
						console.log('weve got a problem')
					}
					const isChildrenExist = !!filteredChildren && Array.isArray(filteredChildren) && filteredChildren.length !== 0
					const isYearValuesExist = !!yearValues && Array.isArray(yearValues) && yearValues.length !== 0
					if (!isYearValuesExist && !isChildrenExist) {
						return null
					}
					return ({
						...neededSubSection.subSectionData,
						children: isChildrenExist ? filteredChildren : null
					})
				}
				return null
			}),
		}
		if (!regionMainSection.subSections) {
			console.error('no subSections')
			break
		}

		console.log(`starting saving... ${mongoRegion}`)
		await StatisticsModel.findOneAndUpdate(
			{ regionName: mongoRegion, 'mainSections.name': regionMainSection.name },
			{ $set: { 'mainSections.$.subSections': regionMainSection.subSections.filter(_subsection => !!_subsection) } },
		)
		console.log(`${mongoRegion} saved to mongo`)

		console.log({ regionMainSection })
	}
}

const saveAllMainSections = async () => {
	for (let fileIndex = 0; fileIndex < files.length; fileIndex += 1) {
		// if (fileIndex < 2) continue
		const file = files[fileIndex]

		const { path } = file
		const fullFileName = path
		const name = removeExtraSpaces(path.split(' -')[1]?.split('.')[0] || '')

		console.log({ fullFileName })
		console.log({ name })
		await saveMainSection(file)
	}

	console.log('finished')
}

// const PORT = 5001
// const listenServer = () => app.listen(PORT, () => {
// 	console.log(`Server ${process.pid} listening at http://localhost:${PORT}`)
// })

try {
	if (!process.env.DB_AUTH) throw new Error('DB_AUTH enviroment variable is undefined')
	mongoose.connect(process.env.DB_AUTH,
		{ useNewUrlParser: true, useUnifiedTopology: true })
	mongoose.connection
		.once('open', () => {
			console.info('connected to MongoDB')
			saveAllMainSections()
			// listenServer()
			// data()
		})
} catch (error) {
	console.error({ error })
}
