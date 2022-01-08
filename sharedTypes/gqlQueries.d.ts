import { ReadonlyStatisticsOfMainSection, ReadonlyRegionCoords, ReadonlyStatisticsOfRegion, ReadonlyStatisticsData, ReadonlyStatisticsOfSubSection } from './mongoModels'

// simple queries
export type StatisticsYearsResponse = ReadonlyArray<number>
export type StatisticsRegionNamesResponse = ReadonlyArray<ReadonlyStatisticsOfRegion['regionName']>
export type StatisticsMainSectionNamesResponse = ReadonlyArray<ReadonlyStatisticsOfMainSection['name']>

// queries with arguments
export type StatisticsSubSectionNamesResponse = ReadonlyArray<ReadonlyStatisticsOfSubSection['name']>
export type SectionsTreeResponse = {
	[key: string]: StatisticsSubSectionNamesResponse
}
export type StatisticsDataResponse = ReadonlyArray<ReadonlyStatisticsData>
export type CoordsByRegionTypeResponse = ReadonlyArray<ReadonlyRegionCoords>