import { Schema, model } from 'mongoose';
import {
  MongoMainSection, MongoSubSection, MongoAnnualStats, MongoAnnualStatsOfRegion,
} from './annualStatsOfRegion';

const AnnualStats = new Schema<MongoAnnualStats>({
  year: Number,
  value: String,
});

const SubSectionSchema = new Schema<MongoSubSection>();
SubSectionSchema.add({
  orderNumber: String,
  name: String,
  subSubSections: [SubSectionSchema],
  annualStats: AnnualStats,
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
