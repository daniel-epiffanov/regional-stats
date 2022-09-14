import {
	MongoMainSection,
	MongoStatisticsOfRegion,
	MongoStatisticsDataItem,
	MongoSubSection
} from './mongoModels'

// general data
export type StatRegionNames = ReadonlyArray<string>

// data to be gotten by query arguments
export type StatYears = ReadonlyArray<number>
export type StatCategories = ReadonlyArray<string>
export type GqlStatData = Readonly<{
	name: string,
	measure: string,
	parentMeasure?: string,
	yearValues: ReadonlyArray<Readonly<{
		year: number,
		value: number,
		prettyValue: string,
		percent: number,
	}>>,
	flag: url,
}>

export type GqlStatYearValuePercents = ReadonlyArray<Readonly<{
	percent: number,
	year: number,
	value: number
}>>
export type GqlStatYearMeanPercents = ReadonlyArray<Readonly<{
	percent: number,
	year: number,
	mean: number
}>>

export type GqlStatRating = Readonly<{
	value: number,
	place: number,
	regionName: string,
	flag: string,
	prettyValue: string,
}>

export type GqlMapRegionNames = ReadonlyArray<string>

type Polygon = Readonly<{
	type: 'Polygon' | 'MultiPolygon',
	coordinates: ReadonlyArray<ReadonlyArray<ReadonlyArray<string>>>
}>

type GqlMapRegionPolygon = Readonly<{
	geometry: Polygon,
	properties: Readonly<{
		name: string
	}>,
}>

export type GqlMapRegionPolygons = ReadonlyArray<GqlMapRegionPolygon>