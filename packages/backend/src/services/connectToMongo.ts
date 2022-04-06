/* eslint-disable no-console */
import mongoose from 'mongoose'

mongoose.connection
	.once('open', () => {
		console.info('connected to MongoDB')
	})
	.on('error', (err) => {
		console.error('MongoDB connection error!')
		console.error({ err })
	})
	.on('disconnected', () => {
		console.info('MongoDB disconnected!')
	})

const connectToMongo = async () => {
	if (!process.env.DB_AUTH) throw new Error('DB_AUTH enviroment variable is undefined')
	await mongoose.connect(process.env.DB_AUTH)
	return mongoose.connection
}

export default connectToMongo
