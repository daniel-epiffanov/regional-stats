import { StatisticsSubSectionNames } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from '../../tests/shared/mongoConnection'
import getStatisticsAllMainSectionNames from './resolversData/getStatisticsAllMainSectionNames'

testMongoConenction()

describe('Tests the createUser Mutation', () => {
	const testServer = getNewApolloServer()

	it('should return null in case we provided a wrong mainSectionName', async () => {
		const response = await testServer.executeOperation({
			query: `query { statisticsSubSectionNames(mainSectionName: "wrong main section name") { name, children { name } } }`
		})


		expect(response.errors).toBeUndefined()

		const statisticsSubSectionNames: StatisticsSubSectionNames | undefined = response.data?.statisticsSubSectionNames
		expect(statisticsSubSectionNames).toBeNull()
	})

	it('should return an array of all sub sections of a given main section as {name: string, children: {name: string} | null}[]', async () => {

		const statisticsAllMainSectionNames = await getStatisticsAllMainSectionNames({ testServer })

		for (let mainSectionNameIndex = 0; mainSectionNameIndex < statisticsAllMainSectionNames.length; mainSectionNameIndex += 1) {
			const mainSectionName = statisticsAllMainSectionNames[mainSectionNameIndex]

			const response = await testServer.executeOperation({
				query: `query { statisticsSubSectionNames(mainSectionName: "${mainSectionName.name}") { name, children { name } } }`
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


	})
})
