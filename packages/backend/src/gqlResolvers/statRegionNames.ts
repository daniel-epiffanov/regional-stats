import { StatRegionNames } from '../../../../sharedTypes/gqlQueries'
import StatisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'

const statisticsRegionNames: ResolverFnAsync<StatRegionNames> = async () => {
	const mongoRes = await StatisticsModel.distinct('regionName')
	return mongoRes
}

export default statisticsRegionNames
