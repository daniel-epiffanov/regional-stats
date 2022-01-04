import { ReadonlyRegionCoords, ReadonlyYearValue } from './mongoModels'

// simple queries
export type YearsResponse = ReadonlyArray<number>
export type RegionNamesResponse = ReadonlyArray<string>
export type MainSectionNamesResponse = ReadonlyArray<string>

// queries with arguments
export type SubSectionNamesResponse = ReadonlyArray<string>
export type SectionsTreeResponse = {
	[key: string]: SubSectionNamesResponse
}
export type StatisticsByYearsResponse = ReadonlyArray<ReadonlyYearValue>
export type CoordsByRegionTypeResponse = ReadonlyArray<ReadonlyRegionCoords>