import { StatisticsRegionNames } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from './shared/testMongoConenction'

testMongoConenction()

test('graphql statisticsRegionNames', async () => {
	const testServer = getNewApolloServer()

	const response = await testServer.executeOperation({
		query: 'query { statisticsRegionNames }',
	})

	expect(response.errors).toBeUndefined()

	const statisticsRegionNames: StatisticsRegionNames | undefined = response.data?.statisticsRegionNames

	if (!statisticsRegionNames) throw new Error('statisticsRegionNames is falsy')

	expect(Array.isArray(statisticsRegionNames)).toBe(true)
	expect(statisticsRegionNames.length).toBeGreaterThan(0)

	statisticsRegionNames.forEach((statisticsRegionName) => {
		expect(typeof statisticsRegionName === 'string').toBe(true)
		expect(statisticsRegionName.length).toBeGreaterThan(0)
	})
})
