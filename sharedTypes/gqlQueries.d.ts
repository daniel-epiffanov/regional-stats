import { MongoMainSection, MongoRegionCoords, MongoStatisticsOfRegion, MongoStatisticsDataItem, MongoSubSection } from './mongoModels'

// general data
export type StatisticsYears = ReadonlyArray<number>
export type StatisticsRegionNames = ReadonlyArray<MongoStatisticsOfRegion['regionName']>
export type StatisticsMainSectionNames = ReadonlyArray<MongoMainSection['name']>

// data to be gotten by query arguments
export type StatisticsSectionsTree = {
	[key: string]: StatisticsSubSectionNames
}
export type StatisticsSubSectionNames = ReadonlyArray<MongoSubSection['name']>
export type StatisticsData = ReadonlyArray<MongoStatisticsDataItem>
export type CoordsByRegionType = ReadonlyArray<MongoRegionCoords>