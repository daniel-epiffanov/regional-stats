export type MongoAnnualStats = Readonly<{
    year: number,
    value: string,
}>
export type MongoSubSection = Readonly<{
    name: string,
    orderNumber: string,
    subSubSections: ReadonlyArray<MongoSubSection>,
    annualStats: ReadonlyArray<MongoAnnualStats>,
}>
export type MongoMainSection = Readonly<{
    name: string,
    fullFilename: string,
    subSections: ReadonlyArray<MongoSubSection>,
}>
export type MongoAnnualStatsOfRegion = Readonly<{
	regionName: string,
	mainSections: ReadonlyArray<MongoMainSection>,
}>
