import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import typeDefs from '../gqltypeDefs'
import resolvers from '../gqlResolvers'

export const getNewApolloServer = () => new ApolloServer({
	typeDefs,
	resolvers,
})

const startApollo = async (app: Express) => {
	const apolloServer = getNewApolloServer()
	await apolloServer.start()
	apolloServer.applyMiddleware({ app, path: '/api' })

	return { apolloServer }
}

export default startApollo
