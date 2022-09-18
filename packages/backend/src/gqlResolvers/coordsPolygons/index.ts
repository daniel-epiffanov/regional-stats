import { GqlCoordsPolygons, RegionTypeArg } from '../../../../../sharedTypes/gqlQueries';
import CoordsOfRegionModel from '../../mongoModels/coordsOfRegion';
import { MongoCoordsOfRegion } from '../../mongoModels/coordsOfRegion/coordsOfRegion';
import { ResolverFnAsync } from '../types/ResolverFn';

type Args = Readonly<{
	regionType: RegionTypeArg,
}>

const coordsPolygons: ResolverFnAsync<GqlCoordsPolygons> = async (
  parent: any,
  args: Args,
) => {
  const { regionType } = args;

  if (!regionType) return null;

  const mongoRes: MongoCoordsOfRegion[] = await CoordsOfRegionModel.find({ regionType });
  console.log({ l: mongoRes.length });
  if (!Array.isArray(mongoRes)) return null;

  const gqlRes = mongoRes.map(coordsOfRegion => ({
    geometry: coordsOfRegion.polygon,
    properties: {
      regionName: coordsOfRegion.regionName,
    },
  }));

  return gqlRes;
};

export default coordsPolygons;
