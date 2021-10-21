export default interface MapCoords {
	type: 'FeatureCollection',
	features: {
		geometry: {
			type: 'Polygon',
			coordinates: number[][][]
		},
		properties: {
			name_ru: string,
			name_en: string,
			alt_names: string[]
		}
	}[],
}
