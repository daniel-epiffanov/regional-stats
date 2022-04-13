import { CoordsByRegionType } from '../../../../../sharedTypes/gqlQueries'
import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from '../../tests/shared/mongoConnection'

testMongoConenction()

describe('Tests the createUser Mutation', () => {
	const testServer = getNewApolloServer()

	it('should return null in case we provided a wrong regionType', async () => {
		const response = await testServer.executeOperation({
			query: `query {
				coordsByRegionType(type: "wrong region type") {
					type,
					geometry {
						type,
						coordinates
					},
					properties {
						name_en
						name_ru
					}
				}
			}`,
		})


		expect(response.errors).toBeUndefined()

		const statisticsSubSectionNames: CoordsByRegionType | undefined = response.data?.statisticsSubSectionNames
		expect(statisticsSubSectionNames).toBeNull()
	})

	it(`should return an array of region coordinates as type: "region" | "federalDistrict";
	geometry: {
			readonly type: "Polygon" | "MultiPolygon";
			readonly coordinates: readonly (readonly (readonly string[])[])[];
	};
	properties: {
			readonly name_ru: string;
			readonly name_en: string;
			readonly alt_names: readonly string[];
	};`, async () => {
		const possibleRegionTypes = ['region', 'federalDistrict']

		for (let regiontTypeIndex = 0; regiontTypeIndex < possibleRegionTypes.length; regiontTypeIndex++) {
			const regionType = possibleRegionTypes[regiontTypeIndex];

			const response = await testServer.executeOperation({
				query: `query {
					coordsByRegionType(type: "${regionType}") {
						type,
						geometry {
							type,
							coordinates
						},
						properties {
							name_en
							name_ru
						}
					}
				}`,
			})

			expect(response.errors).toBeUndefined()

			const regionCoords: CoordsByRegionType | undefined = response.data?.coordsByRegionType

			if (!regionCoords) fail('coordsByRegionType in response is falsy')

			expect(Array.isArray(regionCoords)).toBe(true)
			expect(regionCoords.length).toBeGreaterThan(0)


			regionCoords.forEach((curRegionCoords) => {
				expect(curRegionCoords.geometry).toBeTruthy()
			})
		}

	})


})

