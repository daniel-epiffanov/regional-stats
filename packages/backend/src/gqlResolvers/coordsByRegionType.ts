import { ReadonlyRegionCoords } from '../../../../sharedTypes/mongoModels'
import regionsCoords from '../mongooseModels/regionsCoords'
import { ResolverFnAsync } from './@types/ResolverFn'

const coordsByRegionType: ResolverFnAsync<ReadonlyRegionCoords[]> = async (
	parent: any,
	args: any,
) => {
	const { type } = args

	const mongoRes: ReadonlyRegionCoords[] = await regionsCoords.find({ type })
	return mongoRes
}

export default coordsByRegionType
