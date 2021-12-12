import cookieParser from 'cookie-parser'
import express from 'express'
import connectToMongo from './services/connectToMongo'
import startApollo from './services/startApollo'

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const app = express()

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const PORT = (process.env.PORT && parseInt(process.env.PORT)) || 5000

const startTheApp = async () => {
	await connectToMongo()
	startApollo(app, PORT)
}

startTheApp()
