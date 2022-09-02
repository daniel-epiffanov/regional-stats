import { MongoRegionCoords } from '../../../../sharedTypes/mongoModels'
import RegionsCoordsSchema from '../mongoModels/regionsCoords'
import { ResolverFnAsync } from './types/ResolverFn'

type Args = Readonly<{
	regionType: string,
}>

const mapRegionCoords: ResolverFnAsync<MongoRegionCoords[] | null> = async (
  parent: any,
  args: Args,
) => {
  const { regionType } = args

  const mongoRes: MongoRegionCoords[] = await RegionsCoordsSchema.find({ type: regionType })
  return mongoRes?.length > 0 ? mongoRes : null
}

export default mapRegionCoords
