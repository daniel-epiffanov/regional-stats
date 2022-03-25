/* eslint-disable max-len */
import mongoose from 'mongoose'
import axios from 'axios'
import cors from 'cors'
import express from 'express'
// import osmParser from './osmParser/parser'
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
