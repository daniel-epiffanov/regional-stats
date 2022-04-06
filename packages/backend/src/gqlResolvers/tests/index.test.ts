import { getNewApolloServer } from '../../services/startApollo'

it('returns hello with the provided name', async () => {
	const testServer = getNewApolloServer()

	const result = await testServer.executeOperation({
		query: 'query { test }',
	})

	console.log({ result })

	expect(result.errors).toBeUndefined()
	expect(result.data?.test).toBe('yey')
})
