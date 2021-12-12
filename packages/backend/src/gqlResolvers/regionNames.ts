import { RegionNamesQuery } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongooseModels/statistics'
import { ResolverFnAsync } from './@types/ResolverFn'

const regionNames: ResolverFnAsync<RegionNamesQuery> = async () => {
	const mongoRes = await statisticsModel.distinct('regionName')
	return mongoRes
}

export default regionNames
