
const express = require('express')
const connectToMongo = require('./services/connectToMongo')
require('dotenv').config()
const updateMongo = require('./updateMongo')

const app = express()

const PORT = (process.env.PORT && parseInt(process.env.PORT)) || 5000

const startTheApp = async () => {
	await connectToMongo()
	await app.listen(PORT, () => console.log(`server running on port ${PORT}`))

	updateMongo()
}

startTheApp()

