import { Schema, model } from 'mongoose'
import {
	ReadonlyStatisticsOfMainSection, ReadonlyStatisticsOfRegion, ReadonlyStatisticsOfSubSection, ReadonlyStatisticsData,
} from '../../../../sharedTypes/mongoModels'

const YearValueSchema = new Schema<ReadonlyStatisticsData>({
	year: Number,
	value: String,
})

const SubSectionSchema = new Schema<ReadonlyStatisticsOfSubSection>()
SubSectionSchema.add({
	orderNumber: String,
	name: String,
	children: [SubSectionSchema],
	yearValues: {
		type: [YearValueSchema],
	},
})

const MainSectionSchema = new Schema<ReadonlyStatisticsOfMainSection>({
	name: String,
	fullFilename: String,
	subSections: [SubSectionSchema],
})

const StatisticsSchema = new Schema<ReadonlyStatisticsOfRegion>({
	regionName: String,
	mainSections: [MainSectionSchema],
})

export default model('Statistics', StatisticsSchema)
