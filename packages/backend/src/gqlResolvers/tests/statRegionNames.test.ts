import { StatRegionNames } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from '../../tests/shared/mongoConnection'

testMongoConenction()

test('should return an array of statistics regions as strings', async () => {
	const testServer = getNewApolloServer()

	const response = await testServer.executeOperation({
		query: 'query { statRegionNames }',
	})

	expect(response.errors).toBeUndefined()

	const statRegionNames: StatRegionNames | undefined = response.data?.statRegionNames

	if (!statRegionNames) fail('statRegionNames is falsy')

	expect(Array.isArray(statRegionNames)).toBe(true)
	expect(statRegionNames.length).toBeGreaterThan(0)

	statRegionNames.forEach((statisticsRegionName) => {
		expect(typeof statisticsRegionName === 'string').toBe(true)
		expect(statisticsRegionName.length).toBeGreaterThan(0)
	})
})
