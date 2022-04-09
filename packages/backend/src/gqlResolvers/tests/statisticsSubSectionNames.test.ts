import { StatisticsRegionNames, StatisticsSubSectionNames } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from './shared/testMongoConenction'
import getStatisticsRegionNames from './resolversData/getStatisticsRegionNames'
import getStatisticsMainSectionNames from './resolversData/getStatisticsMainSectionNames'

testMongoConenction()

test('graphql statisticsSubSectionNames', async () => {
	const testServer = getNewApolloServer()

	const statisticsRegionNames: StatisticsRegionNames = await getStatisticsRegionNames({ testServer })
	console.log({ statisticsRegionNames })
	expect(statisticsRegionNames).toBeTruthy()


	// await Promise.all(
	// 	statisticsRegionNames.map(async (regionName) => {

	// 		const statisticsMainSectionNames = await getStatisticsMainSectionNames({ regionName, testServer })

	// 		// console.log({ statisticsMainSectionNames })

	// 		// await Promise.all(
	// 		// 	statisticsMainSectionNames.map(async (statisticsMainSectionName) => {

	// 		// 		const response = await testServer.executeOperation({
	// 		// 			query: `query { statisticsSubSectionNames(regionName: "${regionName}", mainSectionName: "${statisticsMainSectionName.name}") { name, children { name } } }`
	// 		// 		})

	// 		// 		// expect(response.errors).toBeUndefined()

	// 		// 		// const statisticsSubSectionNames: StatisticsSubSectionNames = response.data?.statisticsSubSectionNames

	// 		// 		// expect(Array.isArray(statisticsSubSectionNames)).toBe(true)
	// 		// 		// expect(statisticsSubSectionNames.length).toBeGreaterThan(0)

	// 		// 		// statisticsSubSectionNames.forEach((statisticsSubSectionName) => {
	// 		// 		// 	expect(typeof statisticsSubSectionName.name === 'string').toBe(true)
	// 		// 		// 	expect(statisticsSubSectionName.name.length).toBeGreaterThan(0)
	// 		// 		// 	if (statisticsSubSectionName.children) {
	// 		// 		// 		expect(Array.isArray(statisticsSubSectionName.children)).toBe(true)
	// 		// 		// 		expect(statisticsSubSectionName.children.length).toBeGreaterThan(0)
	// 		// 		// 		statisticsSubSectionName.children.forEach((child) => {
	// 		// 		// 			expect(typeof child.name === 'string').toBe(true)
	// 		// 		// 			expect(child.name.length).toBeGreaterThan(0)
	// 		// 		// 		})
	// 		// 		// 	} else {
	// 		// 		// 		expect(statisticsSubSectionName.children).toBeUndefined()
	// 		// 		// 	}
	// 		// 		// })

	// 		// 	})
	// 		// )

	// 	})
	// )
})
