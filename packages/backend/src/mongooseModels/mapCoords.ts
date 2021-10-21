import { Schema, model } from 'mongoose'

const validateBboxLength = (val: number[]) => val.length === 4

const mapCoordsSchema = new Schema({
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

export default model('MapCoords', mapCoordsSchema)
