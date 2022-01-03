import { Schema, model } from 'mongoose'
import {
	ReadonlyMainSection, ReadonlyStatistics, ReadonlySubSection, ReadonlyYearValue,
} from '../../../../sharedTypes/mongoModels'

const YearValueSchema = new Schema<ReadonlyYearValue>({
	year: Number,
	value: String,
})

const SubSectionSchema = new Schema<ReadonlySubSection>()
SubSectionSchema.add({
	orderNumber: String,
	name: String,
	children: [SubSectionSchema],
	yearValues: {
		type: [YearValueSchema],
	},
})

const MainSectionSchema = new Schema<ReadonlyMainSection>({
	name: String,
	fullFilename: String,
	subSections: [SubSectionSchema],
})

const StatisticsSchema = new Schema<ReadonlyStatistics>({
	regionName: String,
	mainSections: [MainSectionSchema],
})

export default model('Statistics', StatisticsSchema)
