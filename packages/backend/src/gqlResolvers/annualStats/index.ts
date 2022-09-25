import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import _ from 'lodash';
import { GqlAnnualStats, GqlAnnualStatsYears, GqlRegionNames } from '../../../../../sharedTypes/gqlQueries';
import { getFlagUrl } from '../../config/flagsUrls';
import getGrowthPercent from '../../helpers/getGrowthPercent';
import getPrettifiedNumber from '../../helpers/getPrettifiedNumber';
import AnnualStatsOfRegionModel from '../../mongoModels/annualStatsOfRegion';
import { MongoSubSection } from '../../mongoModels/annualStatsOfRegion/annualStatsOfRegion';
import { getNewApolloServer } from '../../services/startApollo';
import { ResolverFnAsync } from '../types/ResolverFn';

type Args = Readonly<{
	regionType: string,
	mainCategoryName: string,
	subCategoryName: string,
	subSubCategoryName?: string,
}>

type AnnualDataMongoRes = Readonly<{
  regionName: string,
  measure: string,
  parentMeasure?:string,
  annualData: MongoSubSection['annualData']
}>
type AnnualStatsRatingMongoRes = Readonly<{
  [key: string]: ReadonlyArray<Readonly<{
    regionName: string,
    value: number
  }>>
}>

const annualStats: ResolverFnAsync<GqlAnnualStats> = async (
  parent: any,
  args: Args,
) => {
  const {
    regionType, mainCategoryName, subCategoryName, subSubCategoryName,
  } = args;

  if (!regionType || !mainCategoryName || !subCategoryName) return null;

  const apolloServer = getNewApolloServer();

  const response = await apolloServer.executeOperation({
    query: jsonToGraphQLQuery({
      query: {
        regionNames: {
          __args: {
            regionType,
          },
        },
        annualStatsYears: true,
      },
    }),
  });

  const regionNames: GqlRegionNames = response.data?.regionNames;
  const years: GqlAnnualStatsYears = response.data?.annualStatsYears;

  if (!Array.isArray(regionNames) || !regionNames.length) return null;

  let annualDataMongoRes: ReadonlyArray<AnnualDataMongoRes>;
  let annualStatsRatingMongoRes: ReadonlyArray<AnnualStatsRatingMongoRes>;

  if (subSubCategoryName) {
    annualDataMongoRes = await AnnualStatsOfRegionModel.aggregate<AnnualDataMongoRes>([
      { $match: { $or: regionNames.map(regionName => ({ regionName })) } },
      { $unwind: '$mainSections' },
      { $match: { 'mainSections.name': mainCategoryName } },
      { $unwind: '$mainSections.subSections' },
      { $match: { 'mainSections.subSections.name': subCategoryName } },
      { $unwind: '$mainSections.subSections.subSubSections' },
      { $match: { 'mainSections.subSections.subSubSections.name': subSubCategoryName } },
      { $project: { regionName: '$regionName', measure: '$mainSections.subSections.subSubSections.measure', annualData: '$mainSections.subSections.subSubSections.annualData' } },
    ]);

    annualStatsRatingMongoRes = await AnnualStatsOfRegionModel
      .aggregate<AnnualStatsRatingMongoRes>([
        {
          $facet: _.merge({}, ...years.map(year => ({
            [year]: [
              { $match: { $or: regionNames.map(regionName => ({ regionName })) } },
              { $unwind: '$mainSections' },
              { $match: { 'mainSections.name': mainCategoryName } },
              { $unwind: '$mainSections.subSections' },
              { $match: { 'mainSections.subSections.name': subCategoryName } },
              { $unwind: '$mainSections.subSections.subSubSections' },
              { $match: { 'mainSections.subSections.subSubSections.name': subSubCategoryName } },
              { $unwind: '$mainSections.subSections.subSubSections.annualData' },
              { $match: { 'mainSections.subSections.subSubSections.annualData.year': year } },
              { $sort: { 'mainSections.subSections.subSubSections.annualData.value': -1 } },
              { $project: { value: '$mainSections.subSections.subSubSections.annualData.value', regionName: '$regionName' } },
            ],
          }))),
        },
      ]);
  } else {
    annualDataMongoRes = await AnnualStatsOfRegionModel.aggregate<AnnualDataMongoRes>([
      { $match: { $or: regionNames.map(regionName => ({ regionName })) } },
      { $unwind: '$mainSections' },
      { $match: { 'mainSections.name': mainCategoryName } },
      { $unwind: '$mainSections.subSections' },
      { $match: { 'mainSections.subSections.name': subCategoryName } },
      { $project: { regionName: '$regionName', measure: '$mainSections.subSections.measure', annualData: '$mainSections.subSections.annualData' } },
    ]);

    annualStatsRatingMongoRes = await AnnualStatsOfRegionModel
      .aggregate<AnnualStatsRatingMongoRes>([
        {
          $facet: _.merge({}, ...years.map(year => ({
            [year]: [
              { $match: { $or: regionNames.map(regionName => ({ regionName })) } },
              { $unwind: '$mainSections' },
              { $match: { 'mainSections.name': mainCategoryName } },
              { $unwind: '$mainSections.subSections' },
              { $match: { 'mainSections.subSections.name': subCategoryName } },
              { $unwind: '$mainSections.subSections.annualData' },
              { $match: { 'mainSections.subSections.annualData.year': year } },
              { $sort: { 'mainSections.subSections.annualData.value': -1 } },
              { $project: { value: '$mainSections.subSections.annualData.value', regionName: '$regionName' } },
            ],
          }))),
        },
      ]);
  }

  const annualStatsRatingData = annualStatsRatingMongoRes[0];

  if (!annualStatsRatingData) return null;

  const gqlRes: GqlAnnualStats = annualDataMongoRes.map(annualStatsItem => ({
    ...annualStatsItem,
    regionFlagUrl: getFlagUrl(annualStatsItem.regionName),
    annualData: annualStatsItem.annualData.map(({ year, value }, i) => ({
      year,
      value,
      prettyValue: getPrettifiedNumber(value) || '',
      annualGrowthPercent: i === 0
        ? 0
        : getGrowthPercent(value, annualStatsItem.annualData[i - 1].value),
      totalGrowthPercent: i === 0
        ? 0
        : getGrowthPercent(value, annualStatsItem.annualData[0].value),
      regionRank: annualStatsRatingData[year]?.findIndex(item => {
        return item.regionName === annualStatsItem.regionName;
      }) + 1,
    })),
  }));

  apolloServer.stop();

  return gqlRes;
};

export default annualStats;
