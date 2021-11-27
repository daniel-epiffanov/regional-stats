import { MultipleRegionCoords, ResolverFnAsync } from '../../../../@types/gqlResolvers'
import regionsCoords from '../mongooseModels/regionsCoords'

const multipleRegionsCoords: ResolverFnAsync<MultipleRegionCoords> = async (
	parent: any,
	args: any,
) => {
	const { type } = args

	const mongoRes: MultipleRegionCoords = await regionsCoords.find({ type })
	return mongoRes
}

export default multipleRegionsCoords
