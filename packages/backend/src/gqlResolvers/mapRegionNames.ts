import { GqlMapRegionNames } from '../../../../sharedTypes/gqlQueries'
import RegionsCoordsSchema from '../mongoModels/regionsCoords'
import { ResolverFnAsync } from './types/ResolverFn'

type Args = Readonly<{
	regionType: string,
}>

type MongoRes = ReadonlyArray<Readonly<{
    regionName: string
}>>

const mapRegionNames: ResolverFnAsync<GqlMapRegionNames | null> = async (
  parent: any,
  args: Args,
) => {
  const { regionType } = args

  const mongoRes: MongoRes = await RegionsCoordsSchema.aggregate([
    { $match: { type: regionType } },
    { $project: { regionName: '$properties.name_ru' } },
  ])
  return mongoRes?.length > 0 ? mongoRes.map(regionNameObj => regionNameObj.regionName) : null
}

export default mapRegionNames
