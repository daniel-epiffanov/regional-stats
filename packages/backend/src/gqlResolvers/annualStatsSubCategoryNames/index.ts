import _ from 'lodash';
import { GqlAnnualStatsCategoryNames } from '../../../../../sharedTypes/gqlQueries';
import StatisticsModel from '../../mongoModels/annualStatsOfRegion';
import { ResolverFnAsync } from '../types/ResolverFn';

type Args = Readonly<{
	mainCategoryName: string,
}>

export const annualStatsSubCategoryNames = async (
  parent: any,
  args: Args,
) => {
  const { mainCategoryName } = args;

  if (!mainCategoryName) return null;

  const mongoRes = await StatisticsModel.aggregate<{ _id: GqlAnnualStatsCategoryNames[0] }>([
    { $unwind: '$mainSections' },
    { $match: { 'mainSections.name': mainCategoryName } },
    { $unwind: '$mainSections.subSections' },
    { $group: { _id: '$mainSections.subSections.name' } },
    { $sort: { _id: 1 } },
  ]);

  const rawSubSectionNames = mongoRes.map(({ _id }) => {
    return _id;
  });
  return rawSubSectionNames;
};

export default annualStatsSubCategoryNames;
