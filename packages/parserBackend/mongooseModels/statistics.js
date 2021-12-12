const { Schema, model, models } = require('mongoose')

const YearValueSchema = new Schema({
	year: Number,
	value: String,
})

const SubSectionSchema = new Schema();
SubSectionSchema.add({
	orderNumber: String,
	name: String,
	children: [SubSectionSchema],
	yearValues: {
		type: [YearValueSchema],
	},
})

const MainSectionSchema = new Schema({
	name: String,
	fullFilename: String,
	subSections: [SubSectionSchema],
})

const StatisticsSchema = new Schema({
	regionName: String,
	mainSections: [MainSectionSchema],
})

module.exports = model('Statistics', StatisticsSchema)
