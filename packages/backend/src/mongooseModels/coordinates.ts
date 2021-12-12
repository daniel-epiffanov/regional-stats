import { Schema, model, models } from 'mongoose'
import { Coordintates } from '../../../../sharedTypes/coordinates'

const regionsCoordsSchema = new Schema<Coordintates>({
	type: {
		type: String,
		required: true,
		enum: ['country', 'region', 'federalDistrict'],
	},
	geometry: {
		type: {
			type: String,
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

export default models.MapCoords || model('MapCoords', regionsCoordsSchema)
