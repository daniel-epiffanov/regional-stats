import { statMainCategories } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from '../../tests/shared/mongoConnection'

testMongoConenction()

test('should return an array of all main sections as {name: string}[]', async () => {
	const testServer = getNewApolloServer()


	const response = await testServer.executeOperation({
		query: `query { statMainCategories { name } }`
	})

	expect(response.errors).toBeUndefined()

	const statMainCategories: statMainCategories | undefined = response.data?.statMainCategories

	if (!statMainCategories) fail('statMainCategories is falsy')

	expect(Array.isArray(statMainCategories)).toBe(true)
	expect(statMainCategories.length).toBeGreaterThan(0)

	statMainCategories.forEach((statisticsMainSectionName) => {
		expect(typeof statisticsMainSectionName.name === 'string').toBe(true)
		expect(statisticsMainSectionName.name.length).toBeGreaterThan(0)
	})
})
