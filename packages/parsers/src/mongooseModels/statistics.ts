import { Schema, model } from 'mongoose'

const dataSchema = new Schema({
	year: {
		type: Number,
		required: true,
	},
	value: {
		type: Number,
		required: true,
	},
})

const subSectionSchema = new Schema()
subSectionSchema.add({
	orderNumber: {
		type: String,
		required: true,
	},
	measure: String,
	name: {
		type: String,
		required: true,
	},
	children: [subSectionSchema],
	yearValues: {
		type: [dataSchema],
	},
})

const mainSectionSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	fullFilename: {
		type: String,
		required: true,
	},
	subSections: {
		type: [subSectionSchema],
		required: true,
	},
})

const statisticsSchema = new Schema({
	regionName: {
		type: String,
		required: true,
	},
	mainSections: {
		type: [mainSectionSchema],
		required: true,
	},
})

export default model('Statistics', statisticsSchema)
