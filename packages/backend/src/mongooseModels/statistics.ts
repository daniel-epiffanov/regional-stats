import { Schema, model } from 'mongoose'

const dataSchema = new Schema({
	year: Number,
	value: String,
})

const subSectionSchema = new Schema()
subSectionSchema.add({
	orderNumber: String,
	title: String,
	children: [subSectionSchema],
	yearValues: {
		type: [dataSchema],
	},
})

const mainSectionSchema = new Schema({
	name: String,
	fullFilename: String,
	subSections: [subSectionSchema],
})

const statisticsSchema = new Schema({
	regionName: String,
	mainSections: [mainSectionSchema],
})

export default model('Statistics', statisticsSchema)
