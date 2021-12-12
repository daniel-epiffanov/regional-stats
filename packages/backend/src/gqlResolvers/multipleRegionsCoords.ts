import RegionCoordinates from '../../../../sharedTypes/regionCoordinates'
import regionsCoords from '../mongooseModels/coordinates'
import { ResolverFnAsync } from './@types/ResolverFn'

const multipleRegionsCoords: ResolverFnAsync<RegionCoordinates[]> = async (
	parent: any,
	args: any,
) => {
	const { type } = args

	const mongoRes: RegionCoordinates[] = await regionsCoords.find({ type })
	return mongoRes
}

export default multipleRegionsCoords
