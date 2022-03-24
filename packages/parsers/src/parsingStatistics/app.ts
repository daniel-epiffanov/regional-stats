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

require('dotenv').config()

const fs = require('fs')

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// const file = new ExcelFile('src/statisticsSrcFiles/Раздел 1 - Население.xlsx')

// console.log(file.path)
// console.log(file.getDetailsSheet(0).getDetailedData())
// console.log(file.getContentsSheet()?.getContentsTree().length)
// console.log(file.getDetailsSheet(34).getDetailedData())

const files: ExcelFile[] = fs.readdirSync('./src/statisticsSrcFiles/').map((fPath: string) => new ExcelFile(`src/statisticsSrcFiles/${fPath}`))
// console.log(files[0].path)
// console.log(files[0].getDetailsSheet(0).getDetailedData())
// console.log('success 19')
const regions = files[0].getDetailsSheet(0).getDetailedData().map((object: any) => object.regionName)

const mainSections = fs.readdirSync('./src/statisticsSrcFiles/').map((fPath: string) => ({ fullFilename: fPath, name: fPath.split(' - ')[1].split('.')[0] }))

const data = () => regions.forEach((region: any, _index: number) => {
	if (_index >= 51 && _index <= 60) {
		console.log(`processing... ${region}`)
		const _mainSections = mainSections.map((mainSection, __index: number) => {
			// if (index === 0) {
			const neededFile = files.find(file => file.path.includes(mainSection.fullFilename))
			// console.log(typeof neededFile)

			let index = 0
			const subSections = neededFile.getContentsSheet()?.getContentsTree().map((tree, i) => {
				// console.log('success 32')
				const neededYearsData = neededFile.getDetailsSheet(index).getDetailedData().find(detailedData => detailedData.regionName === region)
				const neededYearsDataEntries = neededYearsData ? Object.entries(neededYearsData) : null
				if (tree.children.length === 0) index += 1
				return ({
					orderNumber: tree.orderNumber,
					title: tree.sheetTitle,
					children: tree.children.length === 0 ? [] : tree.children.map((child, _i) => {
						// console.log({ child })
						const neededYearsData = neededFile.getDetailsSheet(index).getDetailedData().find(detailedData => detailedData.regionName === region)
						// console.log({ neededYearsData })
						const neededYearsDataEntries = neededYearsData ? Object.entries(neededYearsData) : null
						// console.log({ neededYearsDataEntries })
						index += 1
						return ({
							orderNumber: child.orderNumber,
							title: child.sheetTitle,
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
			})

			return ({
				...mainSection,
				subSections,
			})
			// }
		})

		const finalRegionData = {
			regionName: region,
			mainSections: _mainSections,
		}

		console.log('finished processing')
		console.log('saving to mongodb...')

		const mongooseModel = new StatisticsModel(finalRegionData)
		mongooseModel.save().then(r => {
			console.log('saved to mongodb')
		})
			.catch(err => {
				console.log(`error has been occured in a ${region}`)
				console.log(err)
			})

		// return finalRegionData
	}
})

// data()

const mongodbParser = () => {
	const filter = { type: 'federalDistrict', 'properties.name_ru': 'Сибирский федеральный округ' }
	MapCoordsModel
		.find(filter)
		.then(response => {
			// ts-ignore
			// console.log(Object.bsonsize(response))
			const update = response[0]
			// @ts-ignore
			update.geometry.coordinates = []
			// @ts-ignore
			update.geometry.coordinates[0] = [[70.5, 55.3], [70.9, 55.3], [71.1, 54.2], [71.8, 54.1], [73.7, 54], [73.1, 53.6], [73.5, 53.5], [76.9, 54.4], [76.5, 54.1], [78, 53.3], [80.1, 50.8], [80.7, 51.3], [81.2, 51.2], [81, 50.9], [81.5, 51], [81.4, 50.8], [82.6, 50.8], [83.3, 51.1], [84.2, 50.6], [84.3, 50.2], [85, 50.1], [85, 49.9], [85.3, 49.6], [86.2, 49.5], [86.6, 49.8], [86.8, 49.8], [86.6, 49.6], [87, 49.3], [87.3, 49.2], [87.3, 49.1], [87.5, 49.1], [88.1, 49.3], [88.2, 49.5], [89.2, 49.5], [91.2, 50.5], [92.4, 50.8], [93.1, 50.6], [94.3, 50.6], [94.4, 50.2], [94.7, 50], [95.6, 49.9], [97.3, 49.8], [97.8, 50], [98.3, 50.5], [97.8, 51], [98, 51.4], [98.7, 51.9], [98.8, 52.1], [98.9, 52.1], [99.1, 52.9], [100.3, 53.3], [102, 52.2], [103.9, 51.2], [105.9, 52], [108.9, 54.4], [108.5, 54.6], [108.9, 56.5], [110.1, 56.9], [112.7, 56.9], [113.9, 56.5], [115.1, 57.1], [116.1, 57.2], [115.7, 56.9], [116.3, 56.9], [117.5, 56.9], [117.8, 57.3], [117.1, 57.8], [117.6, 58.4], [118.3, 58.4], [118.7, 58.2], [119.1, 58.3], [118.8, 59.4], [118.3, 59.6], [117.9, 59.5], [117.3, 59.6], [116.7, 60.3], [115.3, 60.5], [112.6, 59.1], [112.3, 59.5], [110.1, 59], [109.2, 59.4], [110.6, 61.1], [109.9, 61.3], [109.6, 61.9], [110, 62.3], [109.3, 62.6], [109.7, 62.9], [109.3, 63.5], [108.2, 63.7], [108.2, 63.8], [108.8, 63.8], [108.5, 64.3], [107.9, 64.2], [105.8, 64.5], [106.5, 65.4], [106.9, 65.4], [107, 65.5], [106.4, 65.7], [106.5, 66], [106.3, 66.2], [106.1, 66.2], [106.1, 66.4], [106.4, 66.5], [106.1, 66.9], [105.6, 67], [106, 67], [106.1, 67.1], [106.5, 67.3], [106.7, 67.2], [106.9, 67.3], [106.9, 68.9], [106.2, 69.4], [106.5, 69.6], [106.6, 69.6], [106.6, 69.5], [106.9, 69.5], [107.9, 69.7], [108.2, 69.8], [108.9, 69.8], [109.2, 69.8], [109.3, 69.8], [109.6, 70], [109.3, 70.1], [109.3, 70.2], [110.7, 70.8], [112.5, 71.1], [112.7, 71.3], [112, 71.4], [112, 72.1], [111, 72.4], [111.3, 72.5], [111.2, 72.6], [110.9, 72.6], [110.7, 72.8], [110.8, 73.2], [110.4, 73.2], [110.4, 73.2], [110.6, 73.3], [110.2, 73.4], [110.7, 73.4], [111.2, 73.6], [110.8, 73.7], [111.8, 74], [111.9, 74.1], [110.5, 74.3], [112.3, 74.6], [112.9, 74.9], [113.6, 74.9], [114.4, 75.2], [114.5, 75.6], [114.7, 76], [114.2, 76.5], [113, 76.8], [111.4, 77], [109.7, 77], [109, 77.1], [108.5, 77.4], [108.2, 78.3], [106.5, 78.6], [106.3, 78.8], [103.7, 79.5], [98.8, 80.3], [99.3, 80.7], [96.1, 81.5], [92.6, 81.3], [90.7, 81.4], [88.9, 81.2], [89.4, 80.9], [91.5, 80.8], [90.3, 80.4], [89.5, 79.4], [92.4, 78.9], [96.6, 78.7], [97, 78.2], [98.4, 77.9], [96, 77.4], [95.6, 77.3], [94.8, 77.2], [91.7, 76.3], [89, 75.9], [87.9, 75.9], [87.5, 75.9], [87.2, 75.7], [85.5, 75.4], [84.6, 75], [83.7, 74.8], [83.4, 74.7], [83.5, 74.6], [82.4, 74.3], [82, 74.3], [81.8, 74.2], [80.2, 73.8], [77.7, 73.6], [77.8, 73], [78.7, 72.5], [78.4, 72.4], [78.7, 72.2], [80.3, 71.9], [80.1, 71.8], [80.1, 71.7], [79.9, 71.6], [79.4, 71.6], [79.3, 71.6], [79.4, 71.5], [79.3, 71.5], [79.1, 71.4], [79.2, 71.3], [79.4, 71.3], [80, 71.1], [80.6, 71], [80.6, 70.8], [80.7, 70.8], [80.7, 70.8], [80.7, 70.7], [80.6, 70.7], [80.6, 70.7], [80.8, 70.7], [80.8, 70.6], [80.7, 70.5], [80.7, 70.4], [80.9, 70.4], [80.8, 70.4], [80.8, 70.4], [80.7, 70.4], [80.6, 70.4], [80.7, 70.4], [80.7, 70.5], [80.4, 70.5], [80.3, 70.4], [80.2, 70.4], [79, 69.9], [78.9, 69.9], [78.9, 69.9], [79, 69.8], [79.1, 69.7], [79.5, 69.6], [79.6, 69.5], [79.9, 69.4], [80.6, 69.3], [80.8, 69.3], [81, 69.2], [81.3, 69.3], [81.4, 69.3], [81.6, 69.3], [81.7, 69.3], [81.6, 69.3], [81.6, 69.4], [81.7, 69.5], [81.9, 69.4], [82, 69.3], [81.8, 69.3], [81.8, 69.2], [82, 69.2], [82.2, 69.2], [82.4, 69.2], [82.5, 69.1], [82.5, 69.1], [82.4, 69.1], [82.3, 69.1], [82.4, 69], [82.4, 69], [82.5, 68.9], [82.6, 68.8], [82.8, 68.8], [82.9, 68.7], [82.8, 68.6], [82.7, 68.6], [82.6, 68.6], [82.6, 68.5], [82.7, 68.4], [82.6, 68.3], [82.6, 68.3], [82.5, 68.2], [82.5, 68.2], [82.3, 68.1], [82.3, 68.1], [82.4, 68.1], [82.4, 67.9], [82.1, 67.9], [82, 68], [81.8, 67.9], [81.8, 67.9], [81.7, 67.9], [81.8, 67.9], [81.9, 67.8], [82.1, 67.7], [82.1, 67.7], [82, 67.6], [82.3, 67.5], [82.4, 67.5], [82.2, 67.4], [82.4, 67.3], [82.2, 67.3], [82.1, 67.2], [83.1, 66.9], [83.3, 66.6], [83.1, 66.6], [83.1, 66.4], [83.3, 66.4], [83.5, 66.2], [83.4, 66.1], [83.4, 66.1], [83.3, 66], [83.4, 66], [83.5, 65.9], [83.5, 65.8], [83.6, 65.8], [83.8, 65.8], [84, 65.8], [84.1, 65.7], [84.2, 65.7], [84.3, 65.7], [84.3, 65.6], [84.2, 65.6], [84.4, 65.5], [84.4, 65.5], [84.5, 65.5], [84.5, 65.4], [84.6, 65.3], [84.5, 65.2], [84.4, 65.2], [84.3, 65.1], [84.3, 65.1], [84.3, 65.1], [84.4, 65.1], [84.3, 64.9], [84.4, 64.9], [84.9, 65], [84.9, 65], [85, 64.9], [84.9, 64.9], [85, 64.8], [85.1, 64.8], [85.1, 64.8], [85.5, 64.8], [85.8, 64.8], [85.9, 64], [85.1, 63.6], [85.6, 63.3], [85.5, 62.9], [84.4, 62.2], [84.6, 61.8], [85.9, 61.6], [85.7, 61.3], [84.2, 60.8], [83.5, 61], [82.2, 60.6], [78.3, 60.8], [77.1, 60.8], [76.6, 59.6], [76.1, 59.5], [75.7, 59.2], [75.7, 59], [74.1, 58.1], [71.3, 58.1], [71.3, 58.4], [70.9, 58.6], [70.4, 57.9], [70.4, 57.9], [70.4, 57.9], [70.4, 57.9], [70.4, 57.9], [70.4, 57.9], [70.4, 57.9], [70.4, 57.8], [70.4, 57.8], [70.5, 57.8], [70.5, 57.7], [70.6, 57.7], [70.6, 57.6], [70.6, 57.6], [70.7, 57.6], [70.7, 57.5], [70.6, 57.5], [70.4, 57.4], [70.4, 57.3], [70.4, 57.3], [70.5, 57.3], [70.5, 57.3], [70.6, 57.3], [70.6, 57.3], [70.6, 57.2], [70.6, 57.2], [70.6, 57.2], [70.7, 57.2], [70.8, 57.3], [70.7, 57.3], [70.7, 57.3], [70.8, 57.3], [70.8, 57.3], [70.8, 57.3], [70.8, 57.4], [70.8, 57.4], [70.8, 57.4], [70.8, 57.4], [70.8, 57.4], [70.9, 57.4], [70.9, 57.4], [71, 57.4], [71, 57.4], [71, 57.3], [71, 57.4], [71.1, 57.3], [71.1, 57.3], [71.1, 57.3], [71.1, 57.3], [71.1, 57.3], [71.1, 57.2], [71.2, 57.2], [71.2, 57.2], [71.2, 57.2], [71.3, 57.1], [71.6, 56.9], [71.7, 56.8], [71.6, 56.8], [71.6, 56.7], [71.4, 56.7], [71.4, 56.6], [71.1, 56.7], [71.1, 56.7], [71, 56.7], [71, 56.6], [71.1, 56.6], [71.1, 56.5], [71, 56.5], [70.9, 56.5], [70.8, 56.5], [70.7, 56.4], [70.8, 56.4], [70.8, 56.4], [70.9, 56.4], [70.9, 56.3], [70.9, 56.3], [70.7, 56.3], [70.8, 56.2], [70.8, 56.2], [70.8, 56.2], [70.8, 56.2], [70.9, 56.1], [70.9, 56.1], [70.9, 56.1], [70.9, 56], [70.8, 55.9], [70.5, 55.9], [70.5, 55.9], [70.6, 55.8], [70.6, 55.8], [70.8, 55.9], [70.8, 55.8], [70.7, 55.8], [70.6, 55.8], [70.6, 55.8], [70.6, 55.8], [70.6, 55.8], [70.6, 55.8], [70.5, 55.7], [70.5, 55.7], [70.6, 55.7], [70.6, 55.6], [70.7, 55.6], [70.8, 55.6], [70.8, 55.6], [70.7, 55.6], [70.7, 55.5], [70.6, 55.5], [70.6, 55.5], [70.4, 55.4], [70.5, 55.4], [70.5, 55.3], [70.5, 55.3], [70.5, 55.3], [70.5, 55.3], [70.5, 55.3]]

			// @ts-ignore
			// update.geometry.coordinates[1] = [[180, 69.3], [180.1, 64.8], [180.8, 65.1], [181.1, 65.3], [182.9, 65.2], [183.3, 65.3], [183.7, 65.2], [183.7, 64.9], [184.4, 64.6], [185.4, 64.5], [186.9, 64], [188.2, 64.3], [188.4, 65.2], [188.5, 65.3], [189, 65.3], [189.8, 65.5], [190, 65.7], [190.1, 65.8], [191, 65.5], [191.1, 66], [191, 66], [190.8, 66], [190.8, 66.2], [190.3, 66.4], [189.2, 66.7], [188.7, 67.1], [188.1, 67.2], [187.9, 67.2], [186.6, 67.3], [184.6, 68], [181.9, 68.7], [181.5, 68.9], [180.8, 69.1], [180.4, 69.1]]

			MapCoordsModel.findOneAndUpdate(filter, update)
				.then(r => {
					console.log('saved to mongo')
					console.log({ r })
					// console.log(JSON.stringify(r))
				})
				.catch(err => {
					console.log('err')
					console.log({ err })
				})
			console.log({ response })
		})
}

mongodbParser()

// console.log(data[0])
app.get('/data', async (req, res) => {
	console.log('starting...')
	// res.send(data())
	// data()

	// new Array(3).fill(0).map(async (x, i) => {
	// 	const mongooseModel = new StatisticsModel({
	// 		regionName: 'region',
	// 		mainSections: null,
	// 	})
	// 	await mongooseModel.save(r => {
	// 		if (r) console.log('error has occured')
	// 		else console.log('saved to mongodb')
	// 	})
	// 	console.log('done saving.')

	// 	return true
	// })
})

const PORT = 5001
const listenServer = () => app.listen(PORT, () => {
	console.log(`Server ${process.pid} listening at http://localhost:${PORT}`)
})

try {
	if (!process.env.DB_AUTH) throw new Error('DB_AUTH enviroment variable is undefined')
	mongoose.connect(process.env.DB_AUTH,
		{ useNewUrlParser: true, useUnifiedTopology: true })
	mongoose.connection
		.once('open', () => {
			console.info('connected to MongoDB')
			listenServer()
		})
} catch (error) {
	console.log('error has occured while connecting o mongodb')
	console.log({ error })
}

// console.log({ data })
// console.log(files[0].getContentsSheet()?.getContentsTree())
// console.log(files[0].path)

// console.log({ mainSections })

// console.log(
// 	file.getDetailsSheet(0).getTopHeaders(),
// )
// console.log(
// 	file.getDetailsSheet(0).getDetailedData(),
// )
// console.log(
// 	file.getContentsSheet()?.getContentsTree(),
// )
