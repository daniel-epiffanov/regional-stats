import { MongoRegionCoords } from '../../../../sharedTypes/mongoModels'
import regionsCoords from '../mongoModels/regionsCoords'
import { ResolverFnAsync } from './types/ResolverFn'

const coordsByRegionType: ResolverFnAsync<MongoRegionCoords[]> = async (
	parent: any,
	args: any,
) => {
	const { type } = args

	const mongoRes: MongoRegionCoords[] = await regionsCoords.find({ type })
	return mongoRes
}

export default coordsByRegionType
