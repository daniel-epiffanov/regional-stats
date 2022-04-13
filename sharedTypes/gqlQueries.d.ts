import {
	MongoMainSection,
	MongoRegionCoords,
	MongoStatisticsOfRegion,
	MongoStatisticsDataItem,
	MongoSubSection
} from './mongoModels'

// general data
export type StatisticsRegionNames = ReadonlyArray<MongoStatisticsOfRegion['regionName']>

// data to be gotten by query arguments
export type StatisticsMainSectionNames = ReadonlyArray<{ name: string }>
export type StatisticsSectionsTree = {
	[key: string]: StatisticsSubSectionNames
}
export type StatisticsYears = ReadonlyArray<number>
export type StatisticsSubSectionNames = ReadonlyArray<{
	name: string,
	children: ReadonlyArray<{
		name: string
	}> | null
}>
export type StatisticsData = Readonly<{
	name: string,
	measure: string,
	parentMeasure?: string,
	yearValues: ReadonlyArray<MongoStatisticsDataItem>
}>
export type CoordsByRegionType = ReadonlyArray<MongoRegionCoords>