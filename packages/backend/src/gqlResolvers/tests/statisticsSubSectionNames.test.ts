import { StatisticsRegionNames, StatisticsSubSectionNames } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from './shared/testMongoConenction'
import getStatisticsRegionNames from './resolversData/getStatisticsRegionNames'
import getStatisticsMainSectionNames from './resolversData/getStatisticsMainSectionNames'

testMongoConenction()

test('graphql statisticsSubSectionNames', async () => {
	const testServer = getNewApolloServer()

	const statisticsRegionNames: StatisticsRegionNames = await getStatisticsRegionNames({ testServer })

	for (let regionNameIndex = 0; regionNameIndex < statisticsRegionNames.length; regionNameIndex += 1) {
		const regionName = statisticsRegionNames[regionNameIndex]

		const statisticsMainSectionNames = await getStatisticsMainSectionNames({ regionName, testServer })

		for (let mainSectionNameIndex = 0; mainSectionNameIndex < statisticsMainSectionNames.length; mainSectionNameIndex += 1) {
			const mainSectionName = statisticsMainSectionNames[mainSectionNameIndex]

			const response = await testServer.executeOperation({
				query: `query { statisticsSubSectionNames(regionName: "${regionName}", mainSectionName: "${mainSectionName.name}") { name, children { name } } }`
			})

			expect(response.errors).toBeUndefined()

			const statisticsSubSectionNames: StatisticsSubSectionNames | undefined = response.data?.statisticsSubSectionNames

			if (!statisticsSubSectionNames) throw new Error('statisticsSubSectionNames is falsy')

			expect(Array.isArray(statisticsSubSectionNames)).toBe(true)
			expect(statisticsSubSectionNames.length).toBeGreaterThan(0)

			statisticsSubSectionNames.forEach((statisticsSubSectionName) => {
				expect(typeof statisticsSubSectionName.name === 'string').toBe(true)
				expect(statisticsSubSectionName.name.length).toBeGreaterThan(0)

				if (statisticsSubSectionName.children) {
					expect(Array.isArray(statisticsSubSectionName.children)).toBe(true)
					expect(statisticsSubSectionName.children.length).toBeGreaterThan(0)
					statisticsSubSectionName.children.forEach((child) => {
						expect(typeof child.name === 'string').toBe(true)
						expect(child.name.length).toBeGreaterThan(0)
					})

					return
				}

				expect(statisticsSubSectionName.children).toBeNull()
			})

		}

	}

})
