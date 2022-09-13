import { GqlStatRating } from '../../../../sharedTypes/gqlQueries';
import { getFlagUrl } from '../config/flagsUrls';
import getPrettifiedNumber from '../helpers/getPrettifiedNumber';
import StatisticsModel from '../mongoModels/statistics';
import { ResolverFnAsync } from './types/ResolverFn';

type Args = Readonly<{
	year: number,
	mainCategory: string,
	subCategory: string,
	subSubCategory: string,
    regionNames: ReadonlyArray<string>
}>

type MongoRes = Omit<GqlStatRating, 'place'>

const resCleanup = (mongoRes: MongoRes[], regionNames: Args['regionNames']) => {
  const res = mongoRes
    .filter(item => regionNames.includes(item.regionName))
    .map((item, i) => ({
      regionName: item.regionName,
      value: item.value,
      place: i + 1,
      flag: getFlagUrl(item.regionName),
      prettyValue: getPrettifiedNumber(item.value) || '',
    }));

  console.log(res);

  return res;
};

const statRating: ResolverFnAsync<GqlStatRating[]> = async (
  parent: any,
  args: Args,
) => {
  const {
    year, mainCategory, subCategory, subSubCategory, regionNames,
  } = args;

  if (subSubCategory) {
    const mongoRes = await StatisticsModel.aggregate<MongoRes>([
      { $unwind: '$mainSections' },
      { $match: { 'mainSections.name': mainCategory } },
      { $unwind: '$mainSections.subSections' },
      { $match: { 'mainSections.subSections.name': subCategory } },
      { $unwind: '$mainSections.subSections.children' },
      { $match: { 'mainSections.subSections.children.name': subSubCategory } },
      { $unwind: '$mainSections.subSections.children.yearValues' },
      { $match: { 'mainSections.subSections.children.yearValues.year': year } },
      { $sort: { 'mainSections.subSections.children.yearValues.value': -1 } },
      { $project: { value: '$mainSections.subSections.children.yearValues.value', regionName: '$regionName' } },
    ]);

    return resCleanup(mongoRes, regionNames);
  }

  const mongoRes = await StatisticsModel.aggregate<MongoRes>([
    { $unwind: '$mainSections' },
    { $match: { 'mainSections.name': mainCategory } },
    { $unwind: '$mainSections.subSections' },
    { $match: { 'mainSections.subSections.name': subCategory } },
    { $unwind: '$mainSections.subSections.yearValues' },
    { $match: { 'mainSections.subSections.yearValues.year': year } },
    { $sort: { 'mainSections.subSections.yearValues.value': -1 } },
    { $project: { value: '$mainSections.subSections.yearValues.value', regionName: '$regionName' } },
  ]);

  return resCleanup(mongoRes, regionNames);
};

export default statRating;
