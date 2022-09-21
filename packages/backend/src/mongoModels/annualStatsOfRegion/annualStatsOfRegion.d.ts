export type MongoAnnualData = Readonly<{
    year: number,
    value: number,
}>
export type MongoSubSection = Readonly<{
    name: string,
    orderNumber: string,
    subSubSections: ReadonlyArray<MongoSubSection>,
    annualData: ReadonlyArray<MongoAnnualData>,
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
