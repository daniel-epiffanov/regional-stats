import { StatisticsRegionNames } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongooseModels/statistics'
import { ResolverFnAsync } from './@types/ResolverFn'

const statisticsRegionNames: ResolverFnAsync<StatisticsRegionNames> = async () => {
	const mongoRes = await statisticsModel.distinct('regionName')
	return mongoRes
}

export default statisticsRegionNames
