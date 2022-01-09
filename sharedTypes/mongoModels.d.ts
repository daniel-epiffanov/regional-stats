// RegionsCoords schema

export interface RegionCoords {
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
}

export type ReadonlyRegionCoords = Readonly<RegionCoords>



// statistics schema

interface StatisticsData {
	year: number,
	value: string,
}

interface StatisticsOfSubSection {
	name: string,
	orderNumber: string,
	children: SubSection[],
	yearValues: StatisticsData[],
}

interface StatisticsOfMainSection {
	name: string,
	fullFilename: string,
	subSections: SubSection[],
}

interface StatisticsOfRegion {
	regionName: string,
	mainSections: MainSection[],
}

export type ReadonlyStatisticsOfRegion = Readonly<StatisticsOfRegion>
export type ReadonlyStatisticsOfMainSection = Readonly<StatisticsOfMainSection>
export type ReadonlyStatisticsOfSubSection = Readonly<StatisticsOfSubSection>
export type ReadonlyStatisticsData = Readonly<StatisticsData>
