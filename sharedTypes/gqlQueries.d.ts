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
export type StatCategories = ReadonlyArray<string>
export type StatData = Readonly<{
	name: string,
	measure: string,
	parentMeasure?: string,
	yearValues: ReadonlyArray<Readonly<{year: number, value: number}>>
}>
export type RegionCoords = ReadonlyArray<MongoRegionCoords>
export type StatYearValuePercents = ReadonlyArray<Readonly<{
	percent: number,
	year: number,
	value: number
}>>