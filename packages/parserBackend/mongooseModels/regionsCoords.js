const { Schema, model, models } = require('mongoose')

const regionsCoordsSchema = new Schema({
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

module.exports = models.MapCoords || model('MapCoords', regionsCoordsSchema)
