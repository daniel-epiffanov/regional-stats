import { Schema, model, models } from 'mongoose'
import { RegionCoords } from '../../../../sharedTypes/mongoModels'

const regionsCoordsSchema = new Schema<RegionCoords>({
	type: {
		type: String,
		required: true,
		enum: ['country', 'region', 'federalDistrict'],
	},
	geometry: {
		type: {
			type: String,
			enum: ['Polygon', 'MultiPolygon'],
		},
		coordinates: [[[Number]]],
	},
	properties: {
		name_en: {
			type: String,
			required: true,
		},
		name_ru: {
			type: String,
			required: true,
		},
		alt_names: [String],
	},
})

export default models.MapCoords || model('RegionsCoords', regionsCoordsSchema)
