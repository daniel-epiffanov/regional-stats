import { Schema, model } from 'mongoose';
import {
  MongoMainSection, MongoSubSection, MongoAnnualData, MongoAnnualStatsOfRegion,
} from './annualStatsOfRegion';

const AnnualData = new Schema<MongoAnnualData>({
  year: Number,
  value: Number,
});

const SubSectionSchema = new Schema<MongoSubSection>();
SubSectionSchema.add({
  orderNumber: String,
  name: String,
  subSubSections: [SubSectionSchema],
  annualData: AnnualData,
});

const MainSectionSchema = new Schema<MongoMainSection>({
  name: String,
  fullFilename: String,
  subSections: [SubSectionSchema],
});

const StatisticsSchema = new Schema<MongoAnnualStatsOfRegion>({
  regionName: String,
  mainSections: [MainSectionSchema],
});

export default model('AnnualStatsOfRegion', StatisticsSchema);
