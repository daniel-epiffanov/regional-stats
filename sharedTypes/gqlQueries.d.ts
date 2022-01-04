import { ReadonlyRegionCoords, ReadonlyYearValue } from './mongoModels'

// simple queries
export type YearsQuery = ReadonlyArray<number>
export type RegionNamesQuery = ReadonlyArray<string>
export type MainSectionNamesQuery = ReadonlyArray<string>

// queries with arguments
export type SubSectionNamesQuery = ReadonlyArray<string>
export type SectionsTreeQuery = {
	[key: string]: SubSectionNamesQuery
}
export type StatisticsByYearsQuery = ReadonlyArray<ReadonlyYearValue>
export type CoordsByRegionTypeQuery = ReadonlyArray<ReadonlyRegionCoords>