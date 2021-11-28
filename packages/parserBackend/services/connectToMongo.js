const mongoose = require('mongoose')
require('dotenv').config()

const connectToMongo = async () => {
	mongoose.connection
		.once('open', () => {
			console.info('connected to MongoDB')
		})
		.on('error', (err) => {
			console.error('MongoDB connection error!')
			console.error({ err })
		})
		.on('disconnected', (err) => {
			console.error('MongoDB disconnected!')
			console.error({ err })
		})

	try {
		if (!process.env.MONGODB_URI) throw new Error('DB_AUTH enviroment variable is undefined')
		await mongoose.connect(process.env.MONGODB_URI)
	} catch (err) {
		throw new Error(`${err}`)
	}
}

module.exports = connectToMongo
