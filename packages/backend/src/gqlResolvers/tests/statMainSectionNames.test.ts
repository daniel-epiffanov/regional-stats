import { StatMainSectionNames } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from '../../tests/shared/mongoConnection'

testMongoConenction()

test('should return an array of all main sections as {name: string}[]', async () => {
	const testServer = getNewApolloServer()


	const response = await testServer.executeOperation({
		query: `query { statMainSectionNames { name } }`
	})

	expect(response.errors).toBeUndefined()

	const statMainSectionNames: StatMainSectionNames | undefined = response.data?.statMainSectionNames

	if (!statMainSectionNames) fail('statisticsMainSectionNames is falsy')

	expect(Array.isArray(statMainSectionNames)).toBe(true)
	expect(statMainSectionNames.length).toBeGreaterThan(0)

	statMainSectionNames.forEach((statisticsMainSectionName) => {
		expect(typeof statisticsMainSectionName.name === 'string').toBe(true)
		expect(statisticsMainSectionName.name.length).toBeGreaterThan(0)
	})
})
