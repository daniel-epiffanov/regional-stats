import { RegionNames, ResolverFnAsync } from '../../../../@types/gqlResolvers'
import statisticsModel from '../mongooseModels/statistics'

const regionNames: ResolverFnAsync<RegionNames> = async () => {
	const mongoRes = await statisticsModel.distinct('regionName')
	return mongoRes
}

export default regionNames
