import { StatisticsMainSectionNames, StatisticsRegionNames } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from './shared/testMongoConenction'
import getStatisticsRegionNames from './resolversData/getStatisticsRegionNames'

testMongoConenction()

test('graphql statisticsAllMainSectionNames', async () => {
	const testServer = getNewApolloServer()


	const response = await testServer.executeOperation({
		query: `query { statisticsAllMainSectionNames { name } }`
	})

	expect(response.errors).toBeUndefined()

	const statisticsAllMainSectionNames: StatisticsMainSectionNames | undefined = response.data?.statisticsAllMainSectionNames

	if (!statisticsAllMainSectionNames) throw new Error('statisticsMainSectionNames is falsy')

	expect(Array.isArray(statisticsAllMainSectionNames)).toBe(true)
	expect(statisticsAllMainSectionNames.length).toBeGreaterThan(0)

	statisticsAllMainSectionNames.forEach((statisticsMainSectionName) => {
		expect(typeof statisticsMainSectionName.name === 'string').toBe(true)
		expect(statisticsMainSectionName.name.length).toBeGreaterThan(0)
	})
})
