import { GqlRegionNames } from '../../../../../sharedTypes/gqlQueries';
import CoordsOfRegionModel from '../../mongoModels/coordsOfRegion';
import { ResolverFnAsync } from '../types/ResolverFn';

type Args = Readonly<{
	regionType: 'federalDistrict' | 'region',
}>

const regionNames: ResolverFnAsync<GqlRegionNames> = async (
  parent: any,
  args: Args,
) => {
  const { regionType } = args;
  const query = regionType ? { regionType } : {};
  const mongoRes: GqlRegionNames = await CoordsOfRegionModel.distinct('regionName', query);
  return mongoRes;
};

export default regionNames;
