import { GqlMapRegionPolygons } from '../../../../sharedTypes/gqlQueries';
import MapSchema from '../mongoModels/mapRegion';
import { MongoMapRegion } from '../mongoModels/mapRegion/mapRegion';
import { ResolverFnAsync } from './types/ResolverFn';

type Args = Readonly<{
	regionType: MongoMapRegion['type'],
}>

const mapRegionPolygons: ResolverFnAsync<GqlMapRegionPolygons | null> = async (
  parent: any,
  args: Args,
) => {
  const { regionType } = args;

  const mongoRes: MongoMapRegion[] = await MapSchema.find({ type: regionType });
  if (mongoRes?.length < 1) return null;

  const gqlRes = mongoRes.map(mapDataItem => ({
    geometry: mapDataItem.polygon,
    properties: {
      name: mapDataItem.name,
    },
  }));

  return gqlRes;
};

export default mapRegionPolygons;
