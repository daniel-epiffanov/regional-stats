export interface RegionCoordsMongo {
	type: string,
	geometry: {
		type: 'Polygon',
		coordinates: string[][][]
	},
	properties: {
		name_ru: string,
		name_en: string,
		alt_names: string[]
	}
}



export interface RegionCoordsGraphql {
	type: 'FeatureCollection',
	features: RegionCoordsMongo[]
}