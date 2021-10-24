/* eslint-disable indent */
// import { ApolloServer } from 'apollo-server-express'
// import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import express from 'express'
// import typeDefs from './gqlSchema'
// import resolvers from './gqlResolvers/index'
import connectToMongo from './services/connectToMongo'
import startApollo from './services/startApollo'

// require('./auth/passport-setup')

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}
// const express = require('express')

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

// app.listen(PORT, () => console.log(`server running on port ${PORT}`))
