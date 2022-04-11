import { StatisticsData, StatisticsRegionNames, StatisticsSubSectionNames } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from './shared/testMongoConenction'
import getStatisticsRegionNames from './resolversData/getStatisticsRegionNames'
import getStatisticsMainSectionNames from './resolversData/getStatisticsAllMainSectionNames'
import getStatisticsSubSectionNames from './resolversData/getStatisticsSubSectionNames'

testMongoConenction()

const statisticsDataExpect = (statisticsData: StatisticsData) => {

	if (!statisticsData) {
		console.log('null')
	}
	expect(Array.isArray(statisticsData.yearValues)).toBe(true)
	expect(statisticsData.yearValues.length).toBeGreaterThan(0)

	statisticsData.yearValues.forEach((yearValue) => {
		expect(typeof yearValue.year === 'number').toBe(true)
		expect(typeof yearValue.value === 'number').toBe(true)
		expect(parseFloat(yearValue.value)).not.toBeNaN()
	})
}

test('graphql statisticsData', async () => {
	const testServer = getNewApolloServer()

	const statisticsRegionNames = await getStatisticsRegionNames({ testServer })
	const statisticsMainSectionNames = await getStatisticsMainSectionNames({ testServer })

	for (let regionNameIndex = 0; regionNameIndex < statisticsRegionNames.length; regionNameIndex += 1) {
		const regionName = statisticsRegionNames[regionNameIndex]

		for (let mainSectionNameIndex = 0; mainSectionNameIndex < statisticsMainSectionNames.length; mainSectionNameIndex += 1) {
			const mainSectionName = statisticsMainSectionNames[mainSectionNameIndex]

			const statisticsSubSectionNames = await getStatisticsSubSectionNames({ testServer, mainSectionName: mainSectionName.name })

			for (let subSectionNameIndex = 0; subSectionNameIndex < statisticsSubSectionNames.length; subSectionNameIndex += 1) {
				const subSectionName = statisticsSubSectionNames[subSectionNameIndex]

				if (!subSectionName.children) {

					const response = await testServer.executeOperation({
						query: `query { statisticsData(
							regionName: "${regionName}",
							mainSectionName: "${mainSectionName.name}",
							subSectionName: "${subSectionName.name}"
						) { 	name,	measure,	parentMeasure,	yearValues {		year,		value	} } }`
					})

					if (!!response.errors) {
						console.log('errors!')
					}

					expect(response.errors).toBeUndefined()

					const statisticsData: StatisticsData | undefined = response.data?.statisticsData

					if (!statisticsData) {
						expect(statisticsData).toBeNull()
						continue
					}

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
							) { name,	measure,	parentMeasure,	yearValues {		year,		value	} } } `
					})

					expect(response.errors).toBeUndefined()

					if (!!response.errors) {
						console.log('errors!')
					}

					const statisticsData: StatisticsData | undefined = response.data?.statisticsData

					if (!statisticsData) {
						expect(statisticsData).toBeNull()
						continue
					}

					statisticsDataExpect(statisticsData)
				}



			}


		}

	}

})
