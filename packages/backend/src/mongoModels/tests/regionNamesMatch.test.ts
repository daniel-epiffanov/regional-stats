import { getNewApolloServer } from '../../services/startApollo'
import testMongoConenction from '../../tests/shared/mongoConnection'
import RegionsCoordsSchema from '../regionsCoords'
import StatisticscSchema from '../statistics'

testMongoConenction()
getNewApolloServer()

test('should return an array of years as intengers', async () => {

	const rawStatisticsRegionNames = await StatisticscSchema.aggregate<{ _id: string }>([
		{ $group: { _id: "$regionName" } }
	])

	expect(Array.isArray(rawStatisticsRegionNames)).toBe(true)
	expect(rawStatisticsRegionNames?.length).toBeGreaterThan(0)

	const statisticsRegionNames = rawStatisticsRegionNames.map(rawStatisticsRegionName => rawStatisticsRegionName._id)


	const rawRegionCoordsRegionNames = await RegionsCoordsSchema.aggregate<{ _id: string }>([
		{ $group: { _id: "$properties.name_ru" } }
	])

	expect(Array.isArray(rawRegionCoordsRegionNames)).toBe(true)
	expect(rawRegionCoordsRegionNames?.length).toBeGreaterThan(0)

	const regionCoordsRegionNames = rawRegionCoordsRegionNames.map(rawRegionCoordsRegionName => rawRegionCoordsRegionName._id)

	regionCoordsRegionNames.forEach(regionCoordsRegionName => {
		expect(statisticsRegionNames.includes(regionCoordsRegionName)).toBe(true)
	})
})

