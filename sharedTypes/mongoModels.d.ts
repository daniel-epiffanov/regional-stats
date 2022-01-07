// RegionsCoords schema

export interface RegionCoords {
	type: string,
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

interface YearValue {
	year: number,
	value: string,
}

interface SubSection {
	name: string,
	orderNumber: string,
	children: SubSection[],
	yearValues: YearValue[],
}

interface MainSection {
	name: string,
	fullFilename: string,
	subSections: SubSection[],
}

interface Statistics {
	regionName: string,
	mainSections: MainSection[],
}

export type ReadonlyStatistics = Readonly<Statistics>
export type ReadonlyMainSection = Readonly<MainSection>
export type ReadonlySubSection = Readonly<SubSection>
export type ReadonlyYearValue = Readonly<YearValue>
