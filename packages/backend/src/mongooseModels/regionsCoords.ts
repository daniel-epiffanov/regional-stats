import { Schema, model, models } from 'mongoose'
import { MultipleRegionsCoordsModel } from '../../../../@types/mongoModels'

const regionsCoordsSchema = new Schema<MultipleRegionsCoordsModel>({
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
