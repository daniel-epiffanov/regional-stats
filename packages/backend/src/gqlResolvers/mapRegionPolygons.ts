import { GqlMapRegionPolygons } from '../../../../sharedTypes/gqlQueries';
import MapSchema from '../mongoModels/coordsOfRegion';
import { MongoCoordsOfRegion } from '../mongoModels/coordsOfRegion/coordsOfRegion';
import { ResolverFnAsync } from './types/ResolverFn';

type Args = Readonly<{
	regionType: MongoCoordsOfRegion['type'],
}>

const mapRegionPolygons: ResolverFnAsync<GqlMapRegionPolygons | null> = async (
  parent: any,
  args: Args,
) => {
  const { regionType } = args;

  const mongoRes: MongoCoordsOfRegion[] = await MapSchema.find({ type: regionType });
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
