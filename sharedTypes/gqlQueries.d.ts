import { RegionCoords, YearValue } from './mongoModels'

export type YearsQuery = number[]
export type RegionNamesQuery = string[]
export type MainSectionNamesQuery = string[]
export type SubSectionNamesQuery = string[]
export type MultipleSubSectionNamesQuery = {
	[key: string]: SubSectionNamesQuery
}
export type StatisticsByYearsQuery = YearValue[]
export type CoordsByRegionTypeQuery = RegionCoords[]