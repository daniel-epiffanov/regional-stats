import { StatYears } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from '../../tests/shared/mongoConnection'

testMongoConenction()

test('should return an array of years as intengers', async () => {
	const testServer = getNewApolloServer()

	const response = await testServer.executeOperation({
		query: 'query { statYears }',
	})

	expect(response.errors).toBeUndefined()

	const statYears: StatYears | undefined = response.data?.statYears

	if (!statYears) fail('statYears in response is falsy')

	expect(Array.isArray(statYears)).toBe(true)
	expect(statYears.length).toBeGreaterThan(0)

	statYears.forEach((year) => {
		expect(typeof year === 'number').toBe(true)
		expect(year).not.toBeNaN()
	})
})
