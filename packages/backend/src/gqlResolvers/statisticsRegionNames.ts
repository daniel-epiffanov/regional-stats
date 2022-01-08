import { StatisticsRegionNamesResponse } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongooseModels/statistics'
import { ResolverFnAsync } from './@types/ResolverFn'

const statisticsRegionNames: ResolverFnAsync<StatisticsRegionNamesResponse> = async () => {
	const mongoRes = await statisticsModel.distinct('regionName')
	return mongoRes
}

export default statisticsRegionNames
