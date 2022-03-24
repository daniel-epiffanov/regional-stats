import mongoose from 'mongoose'
import MapCoordsModel from '../mongooseModels/mapCoords'
import data from './regions'

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config()

// {
// 	regionType: 'region',
// 	regionNameENG: 'russian federation',
// 	regionNameRU: 'российская федерация',
// 	altRegionNames: ['россия', 'russia', 'ru', 'ру'],
// 	coords: [
// 		{
// 			geometry: data.features[0].geometry,
// 		},
// 	],
// }

const db = process.env.DB_AUTH

if (db) {
	mongoose.connect(db,
		{ useNewUrlParser: true, useUnifiedTopology: true })
	mongoose.connection
		.once('open', () => {
			console.info('connected to MongoDB')

			const newInfo = data.features.map((feature) => {
				// eslint-disable-next-line camelcase
				const { name_ru, name_en } = feature.properties

				// eslint-disable-next-line camelcase
				if (name_ru) {
					return {
						type: 'region',
						name_ru,
						name_en,
						geometry: feature.geometry,
					}
				}
				return null
			}).filter(x => x)
			// console.log(newInfo)
			// console.log(newInfo.coords[0].geometry.coordinates[0])

			newInfo.forEach(d => {
				const mapCoords = new MapCoordsModel(d)

				mapCoords.save().then((coordsData: any) => {
					console.log(coordsData)
				})
					.catch((err: any) => {
						console.error({ message: err.message })
					})
			})
			// console.log({ newInfo })
		})
		.on('error', (error) => {
			throw new Error(error)
		})
		.on('disconnected', () => {
			throw new Error('MongoDB disconnected!')
		})
}
