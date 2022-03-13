// RegionsCoords schema

export type MongoRegionCoords = Readonly<{
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

export type MongoStatisticsOfRegion = Readonly<{
	regionName: string,
	mainSections: ReadonlyArray<MongoMainSection>,
}>
export type MongoMainSection = Readonly<{
	name: string,
	fullFilename: string,
	subSections: ReadonlyArray<MongoSubSection>,
}>
export type MongoSubSection = Readonly<{
	name: string,
	orderNumber: string,
	children: ReadonlyArray<SubSection>,
	yearValues: ReadonlyArray<MongoStatisticsDataItem>,
}>
export type MongoStatisticsDataItem = Readonly<{
	year: number,
	value: string,
}>
