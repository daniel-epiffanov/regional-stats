import { RegionNames, ResolverFnAsync } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongooseModels/statistics'

const regionNames: ResolverFnAsync<RegionNames> = async () => {
	const mongoRes = await statisticsModel.distinct('regionName')
	return mongoRes
}

export default regionNames
