/* eslint-disable max-len */
import mongoose from 'mongoose'
import axios from 'axios'
import cors from 'cors'
import express from 'express'
import osmParser from './osmParser/parser'
import mapCoordsModel from './mongooseModels/mapCoords'

require('dotenv').config()

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// const corsOptions = {
// 	origin: process.env.CORS_ORIGIN,
// 	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(cors())

// app.get('/update', async (req, res) => {
// 	mapCoordsModel
// 		.findOneAndUpdate({ name_ru: 'Сибирский федеральный округ' }, {
// 			geometry: null,

// 		})
// 		.then((mongodbRes: any) => {
// 			console.log('saved to mongodb')
// 			// console.log({ mongodbRes })
// 			res.status(201).send('success')
// 		})
// 		.catch((err: any) => {
// 			console.error('error ahs occured while saving to mongodb')
// 			// console.error({ err })
// 			res.status(400).send(err)
// 		})
// })

app.get('/properties', async (req, res) => {
	// mapCoordsModel.updateMany({}, { $unset: { name_ru: 1, name_en: 1, alt_names: 1 } }).then((mongoRes: any) => {
	// 	// res.send('success')
	// 	res.send(mongoRes)
	// })

	// mapCoordsModel
	// 	.find()
	// 	.then((dbRes: any) => {
	// 		console.log(typeof dbRes)
	// 		console.log(dbRes.length)
	// 		console.log(Array.isArray(dbRes))

	// 		dbRes.forEach((coordsObj: any, idx: number) => {
	// 			const { name_en, name_ru, alt_names } = coordsObj
	// 			const properties = {
	// 				name_en, name_ru, alt_names,
	// 			}

	// 			setTimeout(() => {
	// 				mapCoordsModel.findOneAndUpdate({ name_ru }, { name_en: null }).then((res: any) => {
	// 					console.log({ idx })
	// 				})
	// 			}, idx * 200)
	// 		})

	// 		console.log('finish')

	// 		res.send('ok')
	// 	})
})

app.get('/osm', async (req, res) => {
	const stackOfErrors: string[] = []
	console.info('request has beeen made')

	const query = `
	query {
		mapCoords(limit: 100) {
			name_ru,
		}
}`

	console.log('requesting graphql')
	const gqlRes = await axios.post('http://localhost:5000/api', { query })
	// const { mapCoords } = gqlRes.data.data
	const mapCoords = [
		{ name_ru: 'Москва' },
	]

	const requestToPostgis = async (name_ru: string) => {
		const response = await osmParser(name_ru)
		const { rows } = response

		if (Array.isArray(rows) && rows.length > 0) {
			const theBiggest = {
				length: 0,
				idx: 0,
			}

			try {
				rows.forEach((row: any, idx) => {
					if (row && row.st_asgeojson) {
						const st_asgeojson = JSON.parse(row.st_asgeojson)
						const length = st_asgeojson.coordinates[0]
						if (theBiggest.length < length) {
							theBiggest.idx = idx
							theBiggest.length = length
						}
					}
				})

				const arrayToSave = rows[theBiggest.idx]
				const st_asgeojson = JSON.parse(arrayToSave.st_asgeojson)

				console.log('updating mongo')

				mapCoordsModel
					.findOneAndUpdate({ name_ru }, { geometry: st_asgeojson })
					.then((mongodbRes: any) => {
						console.log('saved to mongodb')
						console.log({ mongodbRes })
					})
					.catch((err: any) => {
						console.error('error ahs occured while saving to mongodb')
						console.error({ err })
					})
			} catch (error) {
				console.error('error while parsing st_asgeojson')
				console.error({ error })
				stackOfErrors.push(name_ru)
			}
		} else {
			console.error('no results')
			stackOfErrors.push(name_ru)
		}
	}

	console.log('mapping graphql')
	mapCoords.forEach((mapCoord: any, idx: number) => {
		const { name_ru } = mapCoord

		if (idx === 0) {
			console.log(`requesting postgis at ${name_ru}`)
			requestToPostgis(name_ru)
		} else {
			setTimeout(() => {
				console.log(`requesting postgis at ${name_ru}`)
				console.log({ stackOfErrors })
				requestToPostgis(name_ru)
			}, idx * 120000)
		}
	})
})

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5001
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
