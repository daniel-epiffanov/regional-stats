import { Schema, model } from 'mongoose'
import {
	MongoMainSection, MongoStatisticsOfRegion, MongoSubSection, MongoStatisticsDataItem,
} from '../../../../sharedTypes/mongoModels'

const DataSchema = new Schema<MongoStatisticsDataItem>({
	year: Number,
	value: String,
})

const SubSectionSchema = new Schema<MongoSubSection>()
SubSectionSchema.add({
	orderNumber: String,
	name: String,
	children: [SubSectionSchema],
	yearValues: {
		type: [DataSchema],
	},
})

const MainSectionSchema = new Schema<MongoMainSection>({
	name: String,
	fullFilename: String,
	subSections: [SubSectionSchema],
})

const StatisticsSchema = new Schema<MongoStatisticsOfRegion>({
	regionName: String,
	mainSections: [MainSectionSchema],
})

export default model('Statistics', StatisticsSchema)
