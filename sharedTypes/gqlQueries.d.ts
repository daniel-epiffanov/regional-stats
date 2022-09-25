export type GqlAnnualStatsYears = ReadonlyArray<number>
export type GqlRegionNames = ReadonlyArray<string>
export type GqlAnnualStatsCategoryNames = ReadonlyArray<string>
export type GqlCoordsPolygons = ReadonlyArray<GqlCoordsPolygon>
export type GqlCoordsPoints = ReadonlyArray<GqlCoordsPoint>
export type GqlAnnualStats = ReadonlyArray<GqlAnnualStatsItem>

export type GqlAnnualStatsRating = ReadonlyArray<GqlAnnualStatsRatingItem>

export type GqlAnnualStatsRatingItem = Readonly<{
	regionName: string,
	value: number,
	prettyValue: string,
	regionRank: number,
	regionFlagUrl: string,
	paletteColor: string
}>

export type RegionTypeArg = 'region' | 'federalDistrict'


export type GqlAnnualStatsItem = Readonly<{
	regionName: string
	regionFlagUrl: string,
	measure: string,
	parentMeasure?: string,
	annualData: ReadonlyArray<AnnualDataItem>,
}>

type AnnualDataItem = Readonly<{
	year: number,
	value: number,
	prettyValue: string,
	annualGrowthPercent: number,
	totalGrowthPercent: number,
	regionRank: number
}>


type Polygon = Readonly<{
	type: 'Polygon' | 'MultiPolygon',
	coordinates: ReadonlyArray<ReadonlyArray<ReadonlyArray<number>>>
}>
type Point = Readonly<{
	type: 'Point',
	coordinates: ReadonlyArray<number>
}>

type GqlCoordsPolygon = Readonly<{
	geometry: Polygon,
	properties: Readonly<{
		regionName: string
	}>,
}>
type GqlCoordsPolygon = Readonly<{
	geometry: Polygon,
	properties: Readonly<{
		regionName: string
	}>,
}>

type GqlCoordsPoint = Readonly<{
	geometry: Point,
	properties: Readonly<{
		regionName: string,
		regionFlagUrl: string
	}>,
}>
