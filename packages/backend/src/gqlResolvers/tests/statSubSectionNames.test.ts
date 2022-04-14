import { StatSubSectionNames } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from '../../tests/shared/mongoConnection'
import getStatMainSectionNames from './resolversData/getStatMainSectionNames'

testMongoConenction()

describe('Tests the statSubSectionNames query with a parameter', () => {
	const testServer = getNewApolloServer()

	it('should return null in case we provided a wrong mainSectionName', async () => {
		const response = await testServer.executeOperation({
			query: `query { statSubSectionNames(mainSectionName: "wrong main section name") { name, children { name } } }`
		})


		expect(response.errors).toBeUndefined()

		const statSubSectionNames: StatSubSectionNames | undefined = response.data?.statSubSectionNames
		expect(statSubSectionNames).toBeNull()
	})

	it('should return an array of all sub sections of a given main section as {name: string, children: {name: string}[] | null }', async () => {

		const statisticsAllMainSectionNames = await getStatMainSectionNames({ testServer })

		for (let mainSectionNameIndex = 0; mainSectionNameIndex < statisticsAllMainSectionNames.length; mainSectionNameIndex += 1) {
			const mainSectionName = statisticsAllMainSectionNames[mainSectionNameIndex]

			const response = await testServer.executeOperation({
				query: `query { statSubSectionNames(mainSectionName: "${mainSectionName.name}") { name, children { name } } }`
			})


			expect(response.errors).toBeUndefined()

			const statSubSectionNames: StatSubSectionNames | undefined = response.data?.statSubSectionNames

			if (!statSubSectionNames) throw new Error('statSubSectionNames is falsy')

			expect(Array.isArray(statSubSectionNames)).toBe(true)
			expect(statSubSectionNames.length).toBeGreaterThan(0)

			statSubSectionNames.forEach((statisticsSubSectionName) => {
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
