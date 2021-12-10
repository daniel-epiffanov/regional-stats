import { Schema, model } from 'mongoose'
import {
	MainSection, Statistics, SubSection, YearValue,
} from '../../../../sharedTypes/statistics'

const YearValueSchema = new Schema<YearValue>({
	year: Number,
	value: String,
})

const SubSectionSchema = new Schema<SubSection>()
SubSectionSchema.add({
	orderNumber: String,
	title: String,
	children: [SubSectionSchema],
	yearValues: {
		type: [YearValueSchema],
	},
})

const MainSectionSchema = new Schema<MainSection>({
	name: String,
	fullFilename: String,
	subSections: [SubSectionSchema],
})

const StatisticsSchema = new Schema<Statistics>({
	regionName: String,
	mainSections: [MainSectionSchema],
})

export default model('Statistics', StatisticsSchema)
