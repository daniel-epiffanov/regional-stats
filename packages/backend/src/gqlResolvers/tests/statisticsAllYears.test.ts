import { StatisticsYears } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from '../../tests/shared/mongoConnection'

testMongoConenction()

test('should return an array of all years as intengers', async () => {
	const testServer = getNewApolloServer()

	const response = await testServer.executeOperation({
		query: 'query { statisticsAllYears }',
	})

	expect(response.errors).toBeUndefined()

	const statisticsAllYears: StatisticsYears | undefined = response.data?.statisticsAllYears

	if (!statisticsAllYears) fail('statisticsallYears in response is falsy')

	expect(Array.isArray(statisticsAllYears)).toBe(true)
	expect(statisticsAllYears.length).toBeGreaterThan(0)

	statisticsAllYears.forEach((year) => {
		expect(typeof year === 'number').toBe(true)
		expect(year).not.toBeNaN()
	})
})
