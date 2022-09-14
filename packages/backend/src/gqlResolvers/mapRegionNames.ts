import { GqlMapRegionNames } from '../../../../sharedTypes/gqlQueries';
import RegionsCoordsSchema from '../mongoModels/mapRegion';
import { ResolverFnAsync } from './types/ResolverFn';

type Args = Readonly<{
	regionType: string,
}>

type MongoRes = ReadonlyArray<Readonly<{
    name: string
}>>

const mapRegionNames: ResolverFnAsync<GqlMapRegionNames | null> = async (
  parent: any,
  args: Args,
) => {
  const { regionType } = args;

  const mongoRes: MongoRes = await RegionsCoordsSchema.aggregate([
    { $match: { type: regionType } },
    { $project: { name: '$name' } },
  ]);

  if (mongoRes?.length < 1) return null;
  const gqlRes = mongoRes.map(mapDataItem => mapDataItem.name);
  return gqlRes;
};

export default mapRegionNames;
