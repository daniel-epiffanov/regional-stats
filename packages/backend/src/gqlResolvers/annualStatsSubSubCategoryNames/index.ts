import { GqlAnnualStatsCategoryNames } from '../../../../../sharedTypes/gqlQueries';
import AnnualStatsOfRegionModel from '../../mongoModels/annualStatsOfRegion';
import { ResolverFnAsync } from '../types/ResolverFn';

type Args = Readonly<{
	mainCategoryName: string,
	subCategoryName: string,
}>

const annualStatsSubSubCategoryNames: ResolverFnAsync<GqlAnnualStatsCategoryNames> = async (
  parent: any,
  args: Args,
) => {
  const { mainCategoryName, subCategoryName } = args;

  console.log({ mainCategoryName });
  console.log({ subCategoryName });

  if (!mainCategoryName || !subCategoryName) return null;

  const mongoRes = await AnnualStatsOfRegionModel
    .aggregate<{ _id: GqlAnnualStatsCategoryNames[0] }>([
      { $unwind: '$mainSections' },
      { $match: { 'mainSections.name': mainCategoryName } },
      { $unwind: '$mainSections.subSections' },
      { $match: { 'mainSections.subSections.name': subCategoryName } },
      { $unwind: '$mainSections.subSections.subSubSections' },
      { $group: { _id: '$mainSections.subSections.subSubSections.name' } },
      { $sort: { _id: 1 } },
    ]);

  console.log({ mongoRes });

  if (!Array.isArray(mongoRes)) return null;

  const rawSubSubSectionNames = mongoRes.map(({ _id }) => {
    return _id;
  });
  return rawSubSubSectionNames?.length ? rawSubSubSectionNames : null;
};

export default annualStatsSubSubCategoryNames;
