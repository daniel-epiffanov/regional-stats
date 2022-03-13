// RegionsCoords schema

export type RegionCoords = Readonly<{
	type: 'federalDistrict' | 'region',
	geometry: {
		readonly type: 'Polygon' | 'MultiPolygon',
		readonly coordinates: ReadonlyArray<ReadonlyArray<ReadonlyArray<string>>>
	},
	properties: {
		readonly name_ru: string,
		readonly name_en: string,
		readonly alt_names: ReadonlyArray<string>
	}
}>



// statistics schema

export type StatisticsOfRegion = Readonly<{
	regionName: string,
	mainSections: MainSection[],
}>
export type StatisticsOfMainSection = Readonly<{
	name: string,
	fullFilename: string,
	subSections: SubSection[],
}>
export type StatisticsOfSubSection = Readonly<{
	name: string,
	orderNumber: string,
	children: SubSection[],
	yearValues: StatisticsDataItem[],
}>
export type StatisticsDataItem = Readonly<{
	year: number,
	value: string,
}>
