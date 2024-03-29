import { GqlAnnualStatsCategoryNames } from '../../../../../sharedTypes/gqlQueries';
import AnnualStatsOfRegionModel from '../../mongoModels/annualStatsOfRegion';
import { ResolverFnAsync } from '../types/ResolverFn';

const annualStatsMainCategoryNames: ResolverFnAsync<GqlAnnualStatsCategoryNames> = async () => {
  const mongoRes = await AnnualStatsOfRegionModel.aggregate<{ _id: string }>([
    { $project: { 'mainSections.name': 1 } },
    { $unwind: '$mainSections' },
    { $group: { _id: '$mainSections.name' } },
    { $sort: { _id: 1 } },
  ]);

  const gqlRes = mongoRes.map(({ _id: name }) => name);
  return gqlRes?.length ? gqlRes : null;
};

export default annualStatsMainCategoryNames;
