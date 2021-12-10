import { MultipleRegionsCoords, ResolverFnAsync } from '../../../../sharedTypes/gqlResolvers'
import regionsCoords from '../mongooseModels/regionsCoords'

const multipleRegionsCoords: ResolverFnAsync<MultipleRegionsCoords> = async (
	parent: any,
	args: any,
) => {
	const { type } = args

	const mongoRes: MultipleRegionsCoords = await regionsCoords.find({ type })
	return mongoRes
}

export default multipleRegionsCoords
