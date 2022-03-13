import { ReadonlyStatisticsOfMainSection, ReadonlyRegionCoords, ReadonlyStatisticsOfRegion, ReadonlyStatisticsData, ReadonlyStatisticsOfSubSection } from './mongoModels'

// general data
export type StatisticsYears = ReadonlyArray<number>
export type StatisticsRegionNames = ReadonlyArray<ReadonlyStatisticsOfRegion['regionName']>
export type StatisticsMainSectionNames = ReadonlyArray<ReadonlyStatisticsOfMainSection['name']>

// queries with arguments
export type StatisticsSubSectionNames = ReadonlyArray<ReadonlyStatisticsOfSubSection['name']>
export type SectionsTreeResponse = {
	[key: string]: StatisticsSubSectionNames
}
export type StatisticsData = ReadonlyArray<ReadonlyStatisticsData>
export type CoordsByRegionType = ReadonlyArray<ReadonlyRegionCoords>