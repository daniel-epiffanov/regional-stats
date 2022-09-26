import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { generateColors } from 'devextreme/viz/palette';
import { GqlRegionNames, GqlAnnualStatsRating } from '../../../../../sharedTypes/gqlQueries';
import { getFlagUrl } from '../../config/flagsUrls';
import getPrettifiedNumber from '../../helpers/getPrettifiedNumber';
import AnnualStatsOfRegionModel from '../../mongoModels/annualStatsOfRegion';
import { getNewApolloServer } from '../../services/startApollo';
import { ResolverFnAsync } from '../types/ResolverFn';
import { FEDERAL_DISTRICT_COLOR_GROUPS, MAP_PALETTE, REGIONS_COLOR_GROUPS } from '../../config/map';

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
      { $match: { 'mainSections.subSections.subSubSections.annualData.year': year } },
      { $sort: { 'mainSections.subSections.subSubSections.annualData.value': -1 } },
      { $project: { value: '$mainSections.subSections.subSubSections.annualData.value', regionName: '$regionName' } },
    ]);
  } else {
    mongoRes = await AnnualStatsOfRegionModel.aggregate<MongoRes>([
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
  }

  const regionColors = generateColors(MAP_PALETTE as string[], REGIONS_COLOR_GROUPS.length, {});
  const federalDistrictColors = generateColors(
    MAP_PALETTE as string[], FEDERAL_DISTRICT_COLOR_GROUPS.length, {},
  );

  const getColor = (regionIndex: number) => {
    let colorGroups: ReadonlyArray<number>;
    if (regionType === 'federalDistrict') {
      colorGroups = FEDERAL_DISTRICT_COLOR_GROUPS;
    } else {
      colorGroups = REGIONS_COLOR_GROUPS;
    }
    const colorIndex = colorGroups
      .findIndex((groupEdge, groupEdgeIndex) => {
        return regionIndex < groupEdge && regionIndex >= REGIONS_COLOR_GROUPS[groupEdgeIndex - 1];
      });

    if (regionType === 'federalDistrict') return federalDistrictColors[colorIndex - 1];
    return regionColors[colorIndex - 1];
  };

  const gqlRes: GqlAnnualStatsRating = mongoRes
    .map((item, i) => ({
      regionName: item.regionName,
      value: item.value,
      prettyValue: getPrettifiedNumber(item.value) || '',
      regionRank: i + 1,
      regionFlagUrl: getFlagUrl(item.regionName),
      paletteColor: getColor(i + 1) || '',
    }));

  apolloServer.stop();

  return gqlRes;
};

export default annualStatsRating;
