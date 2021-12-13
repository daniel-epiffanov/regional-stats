// RegionsCoords schema

export interface RegionCoords {
	type: string,
	geometry: {
		type: 'Polygon' | 'MultiPolygon',
		coordinates: string[][][]
	},
	properties: {
		name_ru: string,
		name_en: string,
		alt_names: string[]
	}
}



// statistics schema

export interface YearValue {
	year: number,
	value: string,
}

export interface SubSection {
	name: string,
	orderNumber: string,
	children: SubSection[],
	yearValues: YearValue[],
}

export interface MainSection {
	name: string,
	fullFilename: string,
	subSections: SubSection[],
}

export interface Statistics {
	regionName: string,
	mainSections: MainSection[],
}
