import { StatisticsMainSectionNames } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from '../../tests/shared/mongoConnection'

testMongoConenction()

test('should return an array of all main sections as {name: string}[]', async () => {
	const testServer = getNewApolloServer()


	const response = await testServer.executeOperation({
		query: `query { statisticsAllMainSectionNames { name } }`
	})

	expect(response.errors).toBeUndefined()

	const statisticsAllMainSectionNames: StatisticsMainSectionNames | undefined = response.data?.statisticsAllMainSectionNames

	if (!statisticsAllMainSectionNames) fail('statisticsMainSectionNames is falsy')

	expect(Array.isArray(statisticsAllMainSectionNames)).toBe(true)
	expect(statisticsAllMainSectionNames.length).toBeGreaterThan(0)

	statisticsAllMainSectionNames.forEach((statisticsMainSectionName) => {
		expect(typeof statisticsMainSectionName.name === 'string').toBe(true)
		expect(statisticsMainSectionName.name.length).toBeGreaterThan(0)
	})
})
