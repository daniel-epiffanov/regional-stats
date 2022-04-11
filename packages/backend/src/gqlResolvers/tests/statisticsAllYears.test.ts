import { StatisticsRegionNames, StatisticsYears } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from './shared/testMongoConenction'

testMongoConenction()

test('graphql statisticsAllYEars', async () => {
	const testServer = getNewApolloServer()

	const response = await testServer.executeOperation({
		query: 'query { statisticsAllYears }',
	})

	expect(response.errors).toBeUndefined()

	const statisticsAllYears: StatisticsYears | undefined = response.data?.statisticsAllYears

	if (!statisticsAllYears) throw new Error('statisticsallYears is falsy')

	expect(Array.isArray(statisticsAllYears)).toBe(true)
	expect(statisticsAllYears.length).toBeGreaterThan(0)

	statisticsAllYears.forEach((year) => {
		expect(year).not.toBeNaN()
		expect(typeof year === 'number').toBe(true)
	})
})
