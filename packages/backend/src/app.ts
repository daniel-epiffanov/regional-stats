/* eslint-disable indent */
import cookieSession from 'cookie-session'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import graphqlFields from 'graphql-fields'
import passport from 'passport'
// import { exampleData } from './mocks/exampleData'
import cookieParser from 'cookie-parser'
import typeDefs from './gqlSchema'
import mapCoordsModel from './mongooseModels/mapCoords'
import statisticsModel from './mongooseModels/statistics'
// import isLoggedIn from './auth/isLoggedIn'

// require('./auth/passport-setup')

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}
const express = require('express')

const app = express()

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieSession({
	name: 'google-auth-session',
	keys: ['key1', 'key2'],
}))
app.use(passport.initialize())
app.use(passport.session())

// app.get('/', (req: any, res: any) => {
// 	res.send('you are not logged in!')
// })
// app.get('/failed', isLoggedIn, (req: any, res: any) => {
// 	res.send('authentication failed')
// })
// app.get('/good', isLoggedIn, (req: any, res: any) => {
// 	res.send(`welcome, mr ${req.user.given_name}`)
// })
// app.get('/logout', (req: any, res: any) => {
// 	req.session = null
// 	req.logout()
// 	res.redirect('/')
// })

// app.get('/login', passport.authenticate('google', {
// 	scope: ['profile', 'email'],
// }))
// app.get('/login/callback', passport.authenticate('google',
// 	{ failureRedirect: '/failed' }),
// 	(req: any, res: any) => {
// 		const { user } = req
// 		console.log({ user })
// 		res.redirect('/good')
// 	})

const resolvers = {
	Query: {
		statistics: async (args: any) => {
			console.log({ args })
			const mongoRes = await statisticsModel.find({ regionName: 'Центральный федеральный округ' }).select({ 'mainSections.name': 'Население' })
			return mongoRes
		},
		mapCoords: async (parent: any, args: any, context: any, info: any) => {
			console.info(`requested mapCoords at ${new Date().toLocaleString()}`)
			const requestedFields = Object.keys(graphqlFields(info))
			const {
				input, limit, sort, skip, propertiesFilter,
			} = args

			console.log({ input })
			console.log({ requestedFields })

			// *** input.name_ru && { $regex: input.name_ru, $options: 'i' }
			console.log('starting')
			const coords = await mapCoordsModel
				.find(input)
				.select(requestedFields)
				.limit(limit || 9999)
				.sort(sort || null)
				.skip(skip || 0)

			console.log('finished')
			return coords
		},
	},
}

const PORT = process.env.PORT || 5000

const startApolloServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	})
	await server.start()

	server.applyMiddleware({ app, path: '/api' })

	// app.use((req: any, res: any) => {
	// 	res.status(200)
	// 	res.send('Hello!')
	// 	res.end()
	// })

	await new Promise((resolve) => app.listen({ port: PORT }, resolve))
	console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
	return { server, app }
}

const connectToMongoDB = async () => {
	try {
		if (!process.env.DB_AUTH) throw new Error('DB_AUTH enviroment variable is undefined')
		mongoose.connect(process.env.DB_AUTH)
		mongoose.connection
			.once('open', () => {
				console.info('connected to MongoDB')
				startApolloServer()
			})
			.on('error', (error) => {
				console.error('MongoDB connection error!')
				console.error({ error })
			})
			.on('disconnected', (error) => {
				console.error('MongoDB disconnected!')
				console.error({ error })
			})
	} catch (error) {
		console.error(error)
	}
}

connectToMongoDB()
// app.listen(PORT, () => console.log(`server running on port ${PORT}`))
