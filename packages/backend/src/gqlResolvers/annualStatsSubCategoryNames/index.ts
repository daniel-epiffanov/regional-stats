import { GqlAnnualStatsCategoryNames } from '../../../../../sharedTypes/gqlQueries';
import AnnualStatsOfRegionModel from '../../mongoModels/annualStatsOfRegion';
import { ResolverFnAsync } from '../types/ResolverFn';

type Args = Readonly<{
	mainCategoryName: string,
}>

const annualStatsSubCategoryNames: ResolverFnAsync<GqlAnnualStatsCategoryNames> = async (
  parent: any,
  args: Args,
) => {
  const { mainCategoryName } = args;

  if (!mainCategoryName) return null;

  const mongoRes = await AnnualStatsOfRegionModel
    .aggregate<{ _id: GqlAnnualStatsCategoryNames[0] }>([
      { $unwind: '$mainSections' },
      { $match: { 'mainSections.name': mainCategoryName } },
      { $unwind: '$mainSections.subSections' },
      { $group: { _id: '$mainSections.subSections.name' } },
      { $sort: { _id: 1 } },
    ]);

  if (!Array.isArray(mongoRes)) return null;

  const rawSubSectionNames = mongoRes.map(({ _id }) => {
    return _id;
  });

  return rawSubSectionNames;
};

export default annualStatsSubCategoryNames;
