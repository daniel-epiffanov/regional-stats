import { statSubCategories } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from '../../tests/shared/mongoConnection'
import getstatMainCategories from './resolversData/getstatMainCategories'

testMongoConenction()

describe('Tests the statSubCategories query with a parameter', () => {
	const testServer = getNewApolloServer()

	it('should return null in case we provided a wrong mainSectionName', async () => {
		const response = await testServer.executeOperation({
			query: `query { statSubCategories(mainSectionName: "wrong main section name") { name, children { name } } }`
		})


		expect(response.errors).toBeUndefined()

		const statSubCategories: statSubCategories | undefined = response.data?.statSubCategories
		expect(statSubCategories).toBeNull()
	})

	it('should return an array of all sub sections of a given main section as {name: string, children: {name: string}[] | null }', async () => {

		const statisticsAllMainSectionNames = await getstatMainCategories({ testServer })

		for (let mainSectionNameIndex = 0; mainSectionNameIndex < statisticsAllMainSectionNames.length; mainSectionNameIndex += 1) {
			const mainSectionName = statisticsAllMainSectionNames[mainSectionNameIndex]

			const response = await testServer.executeOperation({
				query: `query { statSubCategories(mainSectionName: "${mainSectionName.name}") { name, children { name } } }`
			})


			expect(response.errors).toBeUndefined()

			const statSubCategories: statSubCategories | undefined = response.data?.statSubCategories

			if (!statSubCategories) throw new Error('statSubCategories is falsy')

			expect(Array.isArray(statSubCategories)).toBe(true)
			expect(statSubCategories.length).toBeGreaterThan(0)

			statSubCategories.forEach((statisticsSubSectionName) => {
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
