import { GqlStatData, statSubCategories } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from '../../tests/shared/mongoConnection'
import statRegionNames from './resolversData/getStatRegionNames'
import StatisticsModel from '../../mongoModels/annualStatsOfRegion'

testMongoConenction()

const statisticsDataExpect = (statData: GqlStatData) => {
  expect(Array.isArray(statData.yearValues)).toBe(true)
  expect(statData.yearValues.length).toBeGreaterThan(0)

  statData.yearValues.forEach((yearValue) => {
    expect(typeof yearValue.year === 'number').toBe(true)
    expect(typeof yearValue.value === 'number').toBe(true)
    expect(parseFloat(yearValue.value)).not.toBeNaN()
  })
}

describe('Tests the statData query with a parameter', () => {
  const testServer = getNewApolloServer()

  it('should return null in case one of the parameters we provided is wrong', async () => {
    const response = await testServer.executeOperation({
      query: `query {
				statDataRight: statData(
					regionName: "Центральный федеральный округ",
					mainSectionName: "Население",
					subSectionName: "Возрастной состав населения",
					subSectionChildName: "Население моложе трудоспособного возраста"
				) {	name,	measure, parentMeasure, yearValues { year, value }}
				statData1: statData(
					regionName: "Центральный федеральный округ WRONG",
					mainSectionName: "Население",
					subSectionName: "Возрастной состав населения",
					subSectionChildName: "Население моложе трудоспособного возраста"
				) {	name,	measure, parentMeasure, yearValues { year, value }}
				statData2: statData(
					regionName: "Центральный федеральный округ",
					mainSectionName: "Население WRONG",
					subSectionName: "Возрастной состав населения WRONG",
					subSectionChildName: "Население моложе трудоспособного возраста"
				) {	name,	measure, parentMeasure, yearValues { year, value }}
				statData3: statData(
					regionName: "Центральный федеральный округ",
					mainSectionName: "Население",
					subSectionName: "Возрастной состав населения WRONG",
					subSectionChildName: "Население моложе трудоспособного возраста"
				) {	name,	measure, parentMeasure, yearValues { year, value }}
				statData4: statData(
					regionName: "Центральный федеральный округ",
					mainSectionName: "Население",
					subSectionName: "Возрастной состав населения",
					subSectionChildName: "Население моложе трудоспособного возраста WRONG"
				) {	name,	measure, parentMeasure, yearValues { year, value }}
			}`,
    })

    expect(response.errors).toBeUndefined()

    const {
      statData1, statData2, statData3, statData4, statDataRight,
    } = response.data || {}

    expect(statData1).toBeNull()
    expect(statData2).toBeNull()
    expect(statData3).toBeNull()
    expect(statData4).toBeNull()
    expect(statDataRight).toBeTruthy()
  })

  it('should return null in case we did not provide subSectionChildName but it was required is this case', async () => {
    const response = await testServer.executeOperation({
      query: `query {
				statDataRight: statData(
					regionName: "Центральный федеральный округ",
					mainSectionName: "Население",
					subSectionName: "Возрастной состав населения",
					subSectionChildName: "Население моложе трудоспособного возраста"
				) {	name,	measure, parentMeasure, yearValues { year, value }}
				statDataWrong: statData(
					regionName: "Центральный федеральный округ",
					mainSectionName: "Население",
					subSectionName: "Возрастной состав населения",
				) {	name,	measure, parentMeasure, yearValues { year, value }}
			}`,
    })

    expect(response.errors).toBeUndefined()

    const { statDataRight, statDataWrong } = response.data || {}

    expect(statDataRight).toBeTruthy()
    expect(statDataWrong).toBeNull()
  })

  it('should return valid statistics data if we have it done', async () => {
    // all regions are tested and it takes about halh an hour. Too long..

    // const statRegionNames = await statRegionNames({ testServer })
    const statRegionNames = ['Российская Федерация', 'г. Севастополь', 'Республика Крым', 'Алтайский край', 'г. Москва', 'Рязанская область']

    for (let regionNameIndex = 0; regionNameIndex < statRegionNames.length; regionNameIndex += 1) {
      const regionName = statRegionNames[regionNameIndex]

      const rawMainSectionNames = await StatisticsModel.aggregate<{ _id: string }>([
        { $match: { regionName } },
        { $project: { 'mainSections.name': 1 } },
        { $unwind: '$mainSections' },
        { $group: { _id: '$mainSections.name' } },
        { $sort: { _id: 1 } },
      ])

      if (!Array.isArray(rawMainSectionNames)) fail('rawMainSectionNames is falsy')

      const mainSectionNames = rawMainSectionNames.map(({ _id: name }) => ({ name }))

      for (let mainSectionNameIndex = 0; mainSectionNameIndex < mainSectionNames.length; mainSectionNameIndex += 1) {
        const mainSectionName = mainSectionNames[mainSectionNameIndex]

        const rawSubSectionNames = await StatisticsModel.aggregate<{ _id: statSubCategories[0] }>([
          { $match: { regionName } },
          { $unwind: '$mainSections' },
          { $match: { 'mainSections.name': mainSectionName.name } },
          { $project: { 'mainSections.subSections.name': 1, 'mainSections.subSections.children.name': 1 } },
          { $project: { subSections: '$mainSections.subSections' } },
          { $unwind: '$subSections' },
          { $group: { _id: { name: '$subSections.name', children: '$subSections.children' } } },
          { $sort: { _id: 1 } },
        ])

        if (!Array.isArray(rawMainSectionNames) || rawMainSectionNames?.length === 0) fail('rawMainSectionNames is falsy')

        const subSectionNames = rawSubSectionNames.map(rawSubSectionName => rawSubSectionName._id)

        for (let subSectionNameIndex = 0; subSectionNameIndex < subSectionNames.length; subSectionNameIndex += 1) {
          const subSectionName = subSectionNames[subSectionNameIndex]

          // const isChidlrenExist = subSectionName.children

          if (!subSectionName.children) {
            const response = await testServer.executeOperation({
              query: `query { statData(
								regionName: "${regionName}",
								mainSectionName: "${mainSectionName.name}",
								subSectionName: "${subSectionName.name}"
							) { 	name,	measure,	parentMeasure,	yearValues {		year,		value	} } }`,
            })

            expect(response.errors).toBeUndefined()

            const statData: GqlStatData | undefined = response.data?.statData

            if (!statData) fail('statData is not truthy')

            statisticsDataExpect(statData)

            continue
          }

          // if (!subSectionName.children) continue

          for (let subSectionChildNameIndex = 0; subSectionChildNameIndex < subSectionName.children.length; subSectionChildNameIndex += 1) {
            const subSectionChildName = subSectionName.children[subSectionChildNameIndex]

            const response = await testServer.executeOperation({
              query: `query { statData(
								regionName: "${regionName}",
								mainSectionName: "${mainSectionName.name}",
								subSectionName: "${subSectionName.name}",
								subSectionChildName: "${subSectionChildName.name}"
								) { name,	measure,	parentMeasure,	yearValues {		year,		value	} } } `,
            })

            expect(response.errors).toBeUndefined()

            const statData: GqlStatData | undefined = response.data?.statData

            if (!statData) fail('statData is not truthy')

            statisticsDataExpect(statData)
          }
        }
      }
    }
  })
})
