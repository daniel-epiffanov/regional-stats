import {
	MongoMainSection,
	MongoRegionCoords,
	MongoStatisticsOfRegion,
	MongoStatisticsDataItem,
	MongoSubSection
} from './mongoModels'

// general data
export type StatRegionNames = ReadonlyArray<string>

// data to be gotten by query arguments
export type StatYears = ReadonlyArray<number>
export type StatMainCategories = ReadonlyArray<string>
export type StatAnyCategories = ReadonlyArray<string>
export type StatData = Readonly<{
	name: string,
	measure: string,
	parentMeasure?: string,
	yearValues: ReadonlyArray<Readonly<{year: number, value: number}>>
}>
export type RegionCoords = ReadonlyArray<MongoRegionCoords>