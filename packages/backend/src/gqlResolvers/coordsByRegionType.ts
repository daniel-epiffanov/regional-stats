import { RegionCoords } from '../../../../sharedTypes/mongoModels'
import regionsCoords from '../mongooseModels/regionsCoords'
import { ResolverFnAsync } from './@types/ResolverFn'

const coordsByRegionType: ResolverFnAsync<RegionCoords[]> = async (
	parent: any,
	args: any,
) => {
	const { type } = args

	const mongoRes: RegionCoords[] = await regionsCoords.find({ type })
	return mongoRes
}

export default coordsByRegionType
