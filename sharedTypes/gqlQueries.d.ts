import { ReadonlyMainSection, ReadonlyRegionCoords, ReadonlyStatistics, ReadonlyYearValue, ReadonlySubSection } from './mongoModels'

// simple queries
export type YearsResponse = ReadonlyArray<number>
export type RegionNamesResponse = ReadonlyArray<ReadonlyStatistics['regionName']>
export type MainSectionNamesResponse = ReadonlyArray<ReadonlyMainSection['name']>

// queries with arguments
export type SubSectionNamesResponse = ReadonlyArray<ReadonlySubSection['name']>
export type SectionsTreeResponse = {
	[key: string]: SubSectionNamesResponse
}
export type StatisticsByYearsResponse = ReadonlyArray<ReadonlyYearValue>
export type CoordsByRegionTypeResponse = ReadonlyArray<ReadonlyRegionCoords>