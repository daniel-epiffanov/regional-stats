import { Coordintates } from '../../../../sharedTypes/coordinates'
import regionsCoords from '../mongooseModels/coordinates'
import { ResolverFnAsync } from './@types/ResolverFn'

const multipleRegionsCoords: ResolverFnAsync<Coordintates[]> = async (
	parent: any,
	args: any,
) => {
	const { type } = args

	const mongoRes: Coordintates[] = await regionsCoords.find({ type })
	return mongoRes
}

export default multipleRegionsCoords
