import { StatisticsOfMainSection, RegionCoords, StatisticsOfRegion, StatisticsData, StatisticsOfSubSection } from './mongoModels'

// general data
export type StatisticsYears = ReadonlyArray<number>
export type StatisticsRegionNames = ReadonlyArray<StatisticsOfRegion['regionName']>
export type StatisticsMainSectionNames = ReadonlyArray<StatisticsOfMainSection['name']>

// queries with arguments
export type StatisticsSubSectionNames = ReadonlyArray<StatisticsOfSubSection['name']>
export type SectionsTreeResponse = {
	[key: string]: StatisticsSubSectionNames
}
export type StatisticsData = ReadonlyArray<StatisticsData>
export type CoordsByRegionType = ReadonlyArray<RegionCoords>