import { RegionNamesResponse } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongooseModels/statistics'
import { ResolverFnAsync } from './@types/ResolverFn'

const regionNames: ResolverFnAsync<RegionNamesResponse> = async () => {
	const mongoRes = await statisticsModel.distinct('regionName')
	return mongoRes
}

export default regionNames
