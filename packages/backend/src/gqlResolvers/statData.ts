import { GqlStatData } from '../../../../sharedTypes/gqlQueries';
import { getFlagUrl } from '../config/flagsUrls';
import StatisticsModel from '../mongoModels/statistics';
import { ResolverFnAsync } from './types/ResolverFn';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

type Args = Readonly<{
	regionName: string,
	mainCategory: string,
	subCategory: string,
	subSubCategory: string,
}>

const statisticsData: ResolverFnAsync<GqlStatData | null> = async (
  parent: any,
  args: Args,
) => {
  const {
    regionName, mainCategory, subCategory, subSubCategory,
  } = args;

  if (subSubCategory) {
    const mongoRes = await StatisticsModel.aggregate<GqlStatData>([
      { $match: { regionName } },
      { $unwind: '$mainSections' },
      { $match: { 'mainSections.name': mainCategory } },
      { $unwind: '$mainSections.subSections' },
      { $match: { 'mainSections.subSections.name': subCategory } },
      { $unwind: '$mainSections.subSections.children' },
      { $match: { 'mainSections.subSections.children.name': subSubCategory } },
      {
        $project: {
          name: '$mainSections.subSections.children.name', measure: '$mainSections.subSections.children.measure', parentMeasure: '$mainSections.subSections.measure', yearValues: '$mainSections.subSections.children.yearValues',
        },
      },
    ]);

    const statData = mongoRes[0];
    const statDataWithFalg = {
      ...statData,
      flag: getFlagUrl(regionName),
    };

    return statData?.yearValues ? statDataWithFalg : null;
  }

  const mongoRes = await StatisticsModel.aggregate<GqlStatData>([
    { $match: { regionName } },
    { $unwind: '$mainSections' },
    { $match: { 'mainSections.name': mainCategory } },
    { $unwind: '$mainSections.subSections' },
    { $match: { 'mainSections.subSections.name': subCategory } },
    { $project: { name: '$mainSections.subSections.name', measure: '$mainSections.subSections.measure', yearValues: '$mainSections.subSections.yearValues' } },
  ]);

  const statData = mongoRes[0];
  const statDataWithFalg = {
    ...statData,
    flag: getFlagUrl(regionName),
  };

  return statData?.yearValues ? statDataWithFalg : null;
};

export default statisticsData;
