import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import typeDefs from '../gqltypeDefs'
import resolvers from '../gqlResolvers'

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const startApollo = async (app: Express, port: number) => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	})
	await server.start()

	server.applyMiddleware({ app, path: '/api' })

	// await new Promise((resolve) => app.listen({ port }, resolve))
	app.listen(port, () => console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`))
	// console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
	return { server, app }
}

export default startApollo
