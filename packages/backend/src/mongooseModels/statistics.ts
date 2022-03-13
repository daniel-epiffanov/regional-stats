import { Schema, model } from 'mongoose'
import {
	StatisticsOfMainSection, StatisticsOfRegion, StatisticsOfSubSection, StatisticsData,
} from '../../../../sharedTypes/mongoModels'

const YearValueSchema = new Schema<StatisticsData>({
	year: Number,
	value: String,
})

const SubSectionSchema = new Schema<StatisticsOfSubSection>()
SubSectionSchema.add({
	orderNumber: String,
	name: String,
	children: [SubSectionSchema],
	yearValues: {
		type: [YearValueSchema],
	},
})

const MainSectionSchema = new Schema<StatisticsOfMainSection>({
	name: String,
	fullFilename: String,
	subSections: [SubSectionSchema],
})

const StatisticsSchema = new Schema<StatisticsOfRegion>({
	regionName: String,
	mainSections: [MainSectionSchema],
})

export default model('Statistics', StatisticsSchema)
