import { StatData, StatRegionNames, StatSubSectionNames } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from '../../tests/shared/mongoConnection'
import statRegionNames from './resolversData/getStatRegionNames'
import getStatisticsMainSectionNames from './resolversData/getStatMainSectionNames'
import getStatSubSectionNames from './resolversData/getStatSubSectionNames'

testMongoConenction()

const statisticsDataExpect = (statisticsData: StatData) => {

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

describe('Tests the statData query with a parameter', async () => {
	const testServer = getNewApolloServer()
	const statisticsRegionNames = await statRegionNames({ testServer })
	const statisticsMainSectionNames = await getStatisticsMainSectionNames({ testServer })



	it('should return null in case one of the parameters we provided is wrong', async () => {
		const response = await testServer.executeOperation({
			query: `query { statSubSectionNames(mainSectionName: "wrong main section name") { name, children { name } } }`
		})


		expect(response.errors).toBeUndefined()

		const statSubSectionNames: StatSubSectionNames | undefined = response.data?.statSubSectionNames
		expect(statSubSectionNames).toBeNull()
	})

	it('should return null in case we did not provide subSectionChildName but it was required is this case', async () => {

	})


})



test('graphql statisticsData', async () => {
	const testServer = getNewApolloServer()


	for (let regionNameIndex = 0; regionNameIndex < statisticsRegionNames.length; regionNameIndex += 1) {
		const regionName = statisticsRegionNames[regionNameIndex]

		for (let mainSectionNameIndex = 0; mainSectionNameIndex < statisticsMainSectionNames.length; mainSectionNameIndex += 1) {
			const mainSectionName = statisticsMainSectionNames[mainSectionNameIndex]

			const statisticsSubSectionNames = await getStatSubSectionNames({ testServer, mainSectionName: mainSectionName.name })

			for (let subSectionNameIndex = 0; subSectionNameIndex < statisticsSubSectionNames.length; subSectionNameIndex += 1) {
				const subSectionName = statisticsSubSectionNames[subSectionNameIndex]

				if (!subSectionName.children) {

					const response = await testServer.executeOperation({
						query: `query { statData(
							regionName: "${regionName}",
							mainSectionName: "${mainSectionName.name}",
							subSectionName: "${subSectionName.name}"
						) { 	name,	measure,	parentMeasure,	yearValues {		year,		value	} } }`
					})

					if (!!response.errors) {
						console.log('errors!')
					}

					expect(response.errors).toBeUndefined()

					const statisticsData: StatData | undefined = response.data?.statisticsData

					if (!statisticsData) {
						expect(statisticsData).toBeNull()
						continue
					}

					if (statisticsData.yearValues.length === 0) {
						console.log('yo')
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

					const statisticsData: StatData | undefined = response.data?.statisticsData


					if (!statisticsData) {
						expect(statisticsData).toBeNull()
						continue
					}

					if (statisticsData.yearValues.length === 0) {
						console.log('yo')
					}

					statisticsDataExpect(statisticsData)
				}



			}


		}

	}

})
