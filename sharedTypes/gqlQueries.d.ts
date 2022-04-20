import {
	MongoMainSection,
	MongoRegionCoords,
	MongoStatisticsOfRegion,
	MongoStatisticsDataItem,
	MongoSubSection
} from './mongoModels'

// general data
export type StatRegionNames = ReadonlyArray<MongoStatisticsOfRegion['regionName']>

// data to be gotten by query arguments
export type StatMainSectionNames = ReadonlyArray<{ name: string }>
export type StatYears = ReadonlyArray<number>
export type StatSubSectionNames = ReadonlyArray<{
	name: string,
	children: ReadonlyArray<{
		name: string
	}> | null
}>
export type StatData = Readonly<{
	name: string,
	measure: string,
	parentMeasure?: string,
	yearValues: ReadonlyArray<MongoStatisticsDataItem>
}>
export type RegionCoords = ReadonlyArray<MongoRegionCoords>