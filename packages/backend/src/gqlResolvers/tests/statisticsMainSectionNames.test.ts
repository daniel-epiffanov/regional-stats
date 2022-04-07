import { StatisticsMainSectionNames, StatisticsRegionNames } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from './shared/testMongoConenction'
import StatisticsModel from '../../mongoModels/statistics'

testMongoConenction()

test('graphql statisticsRegionNames', async () => {
	const testServer = getNewApolloServer()

	const statisticsRegionNames: StatisticsRegionNames = await StatisticsModel.distinct('regionName')


	const allQueries = statisticsRegionNames.map(async (regionName) => {
		const statisticsMainSectionNamesResult = await testServer.executeOperation({
			query: `query { statisticsMainSectionNames(regionName: "${regionName}") }`
		})

		expect(statisticsMainSectionNamesResult.errors).toBeUndefined()

		const statisticsMainSectionNames: StatisticsMainSectionNames = statisticsMainSectionNamesResult.data?.statisticsMainSectionNames

		expect(Array.isArray(statisticsMainSectionNames)).toBe(true)
		expect(statisticsMainSectionNames.length).toBeGreaterThan(0)

		statisticsMainSectionNames.forEach((statisticsMainSectionName) => {
			expect(statisticsMainSectionName).toBeTruthy()
			expect(typeof statisticsMainSectionName === 'string').toBe(true)
			expect(statisticsMainSectionName.length).toBeGreaterThan(0)
		})

	})

	await Promise.all(allQueries)
})

