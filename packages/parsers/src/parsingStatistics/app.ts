/* eslint-disable no-continue */
/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import express from 'express'
import mongoose from 'mongoose'
import ExcelFile from './excelFile'
import StatisticsModel from '../mongooseModels/statistics'
import MapCoordsModel from '../mongooseModels/mapCoords'
import removeExtraSpaces from '../helpers/removeExtraSpaces'

require('dotenv').config()

const fs = require('fs')

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const file = new ExcelFile('src/statisticsSrcFiles/2021/Раздел 2 - Труд.xlsx')

// console.log(file.path)
// console.log(file.getDetailsSheet(0).getDetailedData())
// console.log(file.getContentsSheet()?.getContentsTree().length)
// console.log(file.getDetailsSheet(34).getDetailedData())

// const files: ExcelFile[] = fs.readdirSync('./src/statisticsSrcFiles/2021/').map((fPath: string) => new ExcelFile(`src/statisticsSrcFiles/${fPath}`))
// console.log(files[0].path)
// console.log(files[0].getDetailsSheet(0).getDetailedData())
// console.log('success 19')
const regions = file.getDetailsSheet(0).getDetailedData().map((object: any) => removeExtraSpaces(`${object.regionName}`))

// const mainSections = fs.readdirSync('./src/statisticsSrcFiles/2021/').map((fPath: string) => {
// 	// console.log({ fPath })
// 	return ({ fullFilename: fPath, name: removeExtraSpaces(fPath.split(' -')[1]?.split('.')[0] || '') })
// }).filter(mainSection => !mainSection.fullFilename.includes('~$'))

console.log({ regions })

const savingRegionData = (region: string) => {
	console.log(`processing... ${region}`)
	const mainSection = { fullFileName: 'Раздел 1 - Население.xlsx', name: 'Труд' }
	console.log({ mainSection })
	const neededFile = file // files.find(file => file.path.includes(mainSection.fullFilename))
	let index = 0
	const subSections = neededFile.getContentsSheet()?.getContentsTree()

	const _subsections = subSections.map((tree, i) => {
		// if (i > 1) return

		const deatilsSheet = neededFile.getDetailsSheet(index)

		const measure = tree.children.length === 0 ? deatilsSheet.getSheetMeasure() : null

		const detailedData = deatilsSheet.getDetailedData()

		const neededYearsData = detailedData.find(detailedData => detailedData.regionName === region)
		const neededYearsDataEntries = neededYearsData ? Object.entries(neededYearsData) : null

		if (tree.children.length === 0) index += 1
		const r = ({
			orderNumber: tree.orderNumber,
			name: tree.sheetTitle,
			measure,
			children: tree.children.length === 0 ? null : tree.children.map((child, _i) => {
				const deatilsSheet = neededFile.getDetailsSheet(index)
				const neededYearsData = deatilsSheet.getDetailedData().find(detailedData => detailedData.regionName === region)
				const neededYearsDataEntries = neededYearsData ? Object.entries(neededYearsData) : null

				const measure = deatilsSheet.getSheetMeasure()

				index += 1
				return ({
					orderNumber: child.orderNumber,
					name: child.sheetTitle,
					measure,
					yearValues: neededYearsDataEntries ? neededYearsDataEntries.filter(neededYearsDataEntry => neededYearsDataEntry[0] !== 'regionName').map(neededYearsDataEntry => ({
						year: parseInt(neededYearsDataEntry[0]),
						value: neededYearsDataEntry && neededYearsDataEntry[1] ? neededYearsDataEntry[1].toString() : null,
					})) : null,
				})
			}),
			yearValues: tree.children.length === 0 && neededYearsDataEntries ? neededYearsDataEntries.filter(neededYearsDataEntry => neededYearsDataEntry[0] !== 'regionName').map(neededYearsDataEntry => ({
				year: parseInt(neededYearsDataEntry[0]),
				// @ts-nocheck
				value: neededYearsDataEntry && neededYearsDataEntry[1] ? neededYearsDataEntry[1].toString() : null,
			})) : null,
		})

		return r
	})

	console.log({ _subsections })

	const mainSectionReturn = ({
		...mainSection,
		subSections: _subsections,
	})

	return mainSectionReturn
}

const data = async () => {
	for (let regionIndex = 0; regionIndex < regions.length; regionIndex += 1) {
		// regions.forEach((region, regionIndex) => {
		// if (regionIndex < 35) continue;
		const region = regions[regionIndex]

		const mainSection = savingRegionData(region)

		console.log(`starting saving... ${region}`)
		// eslint-disable-next-line no-await-in-loop
		await StatisticsModel.findOneAndUpdate({ regionName: region, 'mainSections.name': mainSection.name }, { $set: { 'mainSections.$.subSections': mainSection.subSections.filter(_subsection => !!_subsection) } })
		// .then(r => {
		// 	console.log(`${region} saved to mongo`)
		// 	console.log({ r })
		// })
		console.log(`${region} saved to mongo`)
		// })
	}
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
			// listenServer()
			data()
		})
} catch (error) {
	console.error({ error })
}
