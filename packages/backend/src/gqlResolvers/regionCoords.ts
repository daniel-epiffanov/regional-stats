import { MongoRegionCoords } from '../../../../sharedTypes/mongoModels'
import regionsCoords from '../mongoModels/regionsCoords'
import { ResolverFnAsync } from './types/ResolverFn'

type Args = Readonly<{
	regionType: string,
}>


const coordsByRegionType: ResolverFnAsync<MongoRegionCoords[]> = async (
	parent: any,
	args: Args,
) => {
	const { regionType } = args

	const mongoRes: MongoRegionCoords[] = await regionsCoords.find({ type: regionType })
	return mongoRes
}

export default coordsByRegionType
