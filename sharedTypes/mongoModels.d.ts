

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
