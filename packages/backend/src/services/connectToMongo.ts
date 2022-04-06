import mongoose from 'mongoose'

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

	if (!process.env.DB_AUTH) throw new Error('DB_AUTH enviroment variable is undefined')
	await mongoose.connect(process.env.DB_AUTH)
}

export default connectToMongo
