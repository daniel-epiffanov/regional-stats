import { ReadonlyStatisticsOfMainSection, ReadonlyRegionCoords, ReadonlyStatisticsOfRegion, ReadonlyStatisticsData, ReadonlyStatisticsOfSubSection } from './mongoModels'

// simple queries
export type YearsResponse = ReadonlyArray<number>
export type RegionNamesResponse = ReadonlyArray<ReadonlyStatisticsOfRegion['regionName']>
export type MainSectionNamesResponse = ReadonlyArray<ReadonlyStatisticsOfMainSection['name']>

// queries with arguments
export type SubSectionNamesResponse = ReadonlyArray<ReadonlyStatisticsOfSubSection['name']>
export type SectionsTreeResponse = {
	[key: string]: SubSectionNamesResponse
}
export type yearValueResponse = ReadonlyArray<ReadonlyStatisticsData>
export type CoordsByRegionTypeResponse = ReadonlyArray<ReadonlyRegionCoords>