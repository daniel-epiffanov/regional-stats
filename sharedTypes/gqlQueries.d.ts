import { ReadonlyRegionCoords, ReadonlyYearValue } from './mongoModels'

export type YearsQuery = ReadonlyArray<number>
export type RegionNamesQuery = ReadonlyArray<string>
export type MainSectionNamesQuery = ReadonlyArray<string>
export type SubSectionNamesQuery = ReadonlyArray<string>
export type MultipleSubSectionNamesQuery = {
	[key: string]: SubSectionNamesQuery
}
export type StatisticsByYearsQuery = ReadonlyArray<ReadonlyYearValue>
export type CoordsByRegionTypeQuery = ReadonlyArray<ReadonlyRegionCoords>