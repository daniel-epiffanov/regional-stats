import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { GqlAnnualStatsYears, GqlRegionNames } from '../../../../../sharedTypes/gqlQueries';
import AnnualStatsOfRegionModel from '../../mongoModels/annualStatsOfRegion';
import { getNewApolloServer } from '../../services/startApollo';
import { ResolverFnAsync } from '../types/ResolverFn';

type Args = Readonly<{
	mainCategoryName: string,
	subCategoryName: string,
	subSubCategoryName?: string,
  regionType: string
}>

type MongoRes = Readonly<{
  _id: number,
}>

const annualStatsYears: ResolverFnAsync<GqlAnnualStatsYears> = async (
  parent: any,
  args: Args,
) => {
  const {
    mainCategoryName, subCategoryName, subSubCategoryName, regionType,
  } = args;

  if (!mainCategoryName || !subCategoryName || !regionType) {
    const mongoRes = await AnnualStatsOfRegionModel.distinct('mainSections.subSections.annualData.year');
    return mongoRes;
  }

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

  let mongoRes: ReadonlyArray<MongoRes>;

  if (subSubCategoryName) {
    mongoRes = await AnnualStatsOfRegionModel.aggregate<MongoRes>([
      { $match: { $or: regionNames.map(regionName => ({ regionName })) } },
      { $unwind: '$mainSections' },
      { $match: { 'mainSections.name': mainCategoryName } },
      { $unwind: '$mainSections.subSections' },
      { $match: { 'mainSections.subSections.name': subCategoryName } },
      { $unwind: '$mainSections.subSections.subSubSections' },
      { $match: { 'mainSections.subSections.subSubSections.name': subSubCategoryName } },
      { $unwind: '$mainSections.subSections.subSubSections.annualData' },
      { $group: { _id: '$mainSections.subSections.subSubSections.annualData.year' } },
      { $sort: { _id: 1 } },
    ]);
  } else {
    mongoRes = await AnnualStatsOfRegionModel.aggregate<MongoRes>([
      { $match: { $or: regionNames.map(regionName => ({ regionName })) } },
      { $unwind: '$mainSections' },
      { $match: { 'mainSections.name': mainCategoryName } },
      { $unwind: '$mainSections.subSections' },
      { $match: { 'mainSections.subSections.name': subCategoryName } },
      { $unwind: '$mainSections.subSections.annualData' },
      { $group: { _id: '$mainSections.subSections.annualData.year' } },
      { $sort: { _id: 1 } },
    ]);
  }

  const gqlRes = mongoRes.map(({ _id }) => _id);

  apolloServer.stop();

  return gqlRes;
};

export default annualStatsYears;
