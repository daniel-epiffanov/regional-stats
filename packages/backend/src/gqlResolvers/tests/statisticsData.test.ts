import { StatisticsData, StatisticsRegionNames, StatisticsSubSectionNames } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from './shared/testMongoConenction'
import getStatisticsRegionNames from './resolversData/getStatisticsRegionNames'
import getStatisticsMainSectionNames from './resolversData/getStatisticsMainSectionNames'
import getStatisticsSubSectionNames from './resolversData/getStatisticsSubSectionNames'

testMongoConenction()

const statisticsDataExpect = (statisticsData: StatisticsData) => {
	expect(Array.isArray(statisticsData.yearValues)).toBe(true)
	expect(statisticsData.yearValues.length).toBeGreaterThan(0)

	statisticsData.yearValues.forEach((yearValue) => {
		expect(typeof yearValue.year === 'number').toBe(true)
		expect(typeof yearValue.value === 'number').toBe(true)
		expect(yearValue.value.length).toBeGreaterThan(0)
		expect(parseFloat(yearValue.value)).not.toBeNaN()
	})
}

test('graphql statisticsSubSectionNames', async () => {
	const testServer = getNewApolloServer()

	const statisticsRegionNames: StatisticsRegionNames = await getStatisticsRegionNames({ testServer })

	for (let regionNameIndex = 0; regionNameIndex < statisticsRegionNames.length; regionNameIndex += 1) {
		const regionName = statisticsRegionNames[regionNameIndex]

		const statisticsMainSectionNames = await getStatisticsMainSectionNames({ regionName, testServer })

		for (let mainSectionNameIndex = 0; mainSectionNameIndex < statisticsMainSectionNames.length; mainSectionNameIndex += 1) {
			const mainSectionName = statisticsMainSectionNames[mainSectionNameIndex]

			const statisticsSubSectionNames = await getStatisticsSubSectionNames({ testServer, regionName, mainSectionName: mainSectionName.name })

			for (let subSectionNameIndex = 0; subSectionNameIndex < statisticsSubSectionNames.length; subSectionNameIndex += 1) {
				const subSectionName = statisticsSubSectionNames[subSectionNameIndex]

				if (!subSectionName.children) {

					const response = await testServer.executeOperation({
						query: `query { statisticsData(regionName: "${regionName}", mainSectionName: "${mainSectionName.name}", subSectionName: "${subSectionName.name}") { name, children { name } } }`
					})

					expect(response.errors).toBeUndefined()

					const statisticsData: StatisticsData = response.data?.statisticsData

					statisticsDataExpect(statisticsData)

					continue
				}

				for (let subSectionChildNameIndex = 0; subSectionChildNameIndex < subSectionName.children.length; subSectionChildNameIndex += 1) {
					const subSectionChildName = subSectionName.children[subSectionChildNameIndex]

					const response = await testServer.executeOperation({
						query: `query { statisticsData(
							regionName: "${regionName}",
							mainSectionName: "${mainSectionName.name}",
							subSectionName: "${subSectionName.name}",
							subSectionChildName: "${subSectionChildName.name}"
							) { name, children { name } } }`
					})

					expect(response.errors).toBeUndefined()

					const statisticsData: StatisticsData = response.data?.statisticsData

					statisticsDataExpect(statisticsData)
				}



			}


		}

	}

})
