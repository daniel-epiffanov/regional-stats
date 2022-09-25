import { GqlCoordsPoints, RegionTypeArg } from '../../../../../sharedTypes/gqlQueries';
import { getFlagUrl } from '../../config/flagsUrls';
import CoordsOfRegionModel from '../../mongoModels/coordsOfRegion';
import { MongoCoordsOfRegion } from '../../mongoModels/coordsOfRegion/coordsOfRegion';
import { ResolverFnAsync } from '../types/ResolverFn';

type Args = Readonly<{
	regionType: RegionTypeArg,
}>

const coordsPoints: ResolverFnAsync<GqlCoordsPoints> = async (
  parent: any,
  args: Args,
) => {
  const { regionType } = args;

  if (!regionType) return null;

  const mongoRes: MongoCoordsOfRegion[] = await CoordsOfRegionModel.find({ regionType });
  if (!Array.isArray(mongoRes)) return null;

  const gqlRes = mongoRes.map(coordsOfRegion => ({
    geometry: coordsOfRegion.point,
    properties: {
      regionName: coordsOfRegion.regionName,
      regionFlagUrl: getFlagUrl(coordsOfRegion.regionName),
    },
  }));

  return gqlRes;
};

export default coordsPoints;
