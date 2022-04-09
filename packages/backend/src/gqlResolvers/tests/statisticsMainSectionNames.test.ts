import { StatisticsMainSectionNames, StatisticsRegionNames } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from './shared/testMongoConenction'
import getStatisticsRegionNames from './resolversData/getStatisticsRegionNames'

testMongoConenction()

test('graphql statisticsMainSectionNames', async () => {
	const testServer = getNewApolloServer()

	const statisticsRegionNames: StatisticsRegionNames = await getStatisticsRegionNames({ testServer })


	await Promise.all(
		statisticsRegionNames.map(async (regionName) => {
			const response = await testServer.executeOperation({
				query: `query { statisticsMainSectionNames(regionName: "${regionName}") { name } }`
			})

			expect(response.errors).toBeUndefined()

			const statisticsMainSectionNames: StatisticsMainSectionNames = response.data?.statisticsMainSectionNames

			expect(Array.isArray(statisticsMainSectionNames)).toBe(true)
			expect(statisticsMainSectionNames.length).toBeGreaterThan(0)

			statisticsMainSectionNames.forEach((statisticsMainSectionName) => {
				expect(typeof statisticsMainSectionName.name === 'string').toBe(true)
				expect(statisticsMainSectionName.name.length).toBeGreaterThan(0)
			})

		})
	)
})
