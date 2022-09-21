import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { GqlRegionNames, GqlAnnualStatsRating } from '../../../../../sharedTypes/gqlQueries';
import { getFlagUrl } from '../../config/flagsUrls';
import getPrettifiedNumber from '../../helpers/getPrettifiedNumber';
import AnnualStatsOfRegionModel from '../../mongoModels/annualStatsOfRegion';
import { getNewApolloServer } from '../../services/startApollo';
import { ResolverFnAsync } from '../types/ResolverFn';

type Args = Readonly<{
	year: number,
	mainCategoryName: string,
	subCategoryName: string,
	subSubCategoryName?: string,
  regionType: string
}>

type MongoRes = Readonly<{
  regionName: string,
  value: number
}>

const annualStatsRating: ResolverFnAsync<GqlAnnualStatsRating> = async (
  parent: any,
  args: Args,
) => {
  const {
    year, mainCategoryName, subCategoryName, subSubCategoryName, regionType,
  } = args;

  const apolloServer = getNewApolloServer();

  const response = await apolloServer.executeOperation({
    query: jsonToGraphQLQuery({
      query: {
        regionNames: {
          __args: {
            regionType,
          },
        },
      },
    }),
  });

  const regionNames: GqlRegionNames = response.data?.regionNames;

  // if (subSubCategory) {
  //   const mongoRes = await StatisticsModel.aggregate<MongoRes>([
  //     { $unwind: '$mainSections' },
  //     { $match: { 'mainSections.name': mainCategory } },
  //     { $unwind: '$mainSections.subSections' },
  //     { $match: { 'mainSections.subSections.name': subCategory } },
  //     { $unwind: '$mainSections.subSections.children' },
  //     { $match: { 'mainSections.subSections.children.name': subSubCategory } },
  //     { $unwind: '$mainSections.subSections.children.yearValues' },
  //     { $match: { 'mainSections.subSections.children.yearValues.year': year } },
  //     { $sort: { 'mainSections.subSections.children.yearValues.value': -1 } },
  // eslint-disable-next-line max-len
  //     { $project: { value: '$mainSections.subSections.children.yearValues.value', regionName: '$regionName' } },
  //   ]);

  //   return resCleanup(mongoRes, regionNames);
  // }

  const mongoRes = await AnnualStatsOfRegionModel.aggregate<MongoRes>([
    { $match: { $or: regionNames.map(regionName => ({ regionName })) } },
    { $unwind: '$mainSections' },
    { $match: { 'mainSections.name': mainCategoryName } },
    { $unwind: '$mainSections.subSections' },
    { $match: { 'mainSections.subSections.name': subCategoryName } },
    { $unwind: '$mainSections.subSections.annualData' },
    { $match: { 'mainSections.subSections.annualData.year': year } },
    { $sort: { 'mainSections.subSections.annualData.value': -1 } },
    { $project: { value: '$mainSections.subSections.annualData.value', regionName: '$regionName' } },
  ]);

  const gqlRes: GqlAnnualStatsRating = mongoRes
    // .filter(item => regionNames.includes(item.regionName))
    .map((item, i) => ({
      regionName: item.regionName,
      value: item.value,
      prettyValue: getPrettifiedNumber(item.value) || '',
      regionRank: i + 1,
      regionFlagUrl: getFlagUrl(item.regionName),
    }));

  return gqlRes;
};

export default annualStatsRating;
