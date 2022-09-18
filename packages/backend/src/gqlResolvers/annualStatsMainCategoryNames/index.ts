import { GqlAnnualStatsCategoryNames } from '../../../../../sharedTypes/gqlQueries';
import StatisticsModel from '../../mongoModels/annualStatsOfRegion';
import { ResolverFnAsync } from '../types/ResolverFn';

const annualStatsMainCategoryNames: ResolverFnAsync<GqlAnnualStatsCategoryNames> = async () => {
  const mongoRes = await StatisticsModel.aggregate<{ _id: string }>([
    { $project: { 'mainSections.name': 1 } },
    { $unwind: '$mainSections' },
    { $group: { _id: '$mainSections.name' } },
    { $sort: { _id: 1 } },
  ]);

  return mongoRes.map(({ _id: name }) => name);
};

export default annualStatsMainCategoryNames;
