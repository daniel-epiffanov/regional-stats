import { StatisticsMainSectionNamesResponse } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongooseModels/statistics'
import { ResolverFnAsync } from './@types/ResolverFn'

const statisticsMainSectionNames: ResolverFnAsync<StatisticsMainSectionNamesResponse> = async () => {
	const mongoRes: string[] = await statisticsModel.distinct('mainSections.name')
	return mongoRes
}

export default statisticsMainSectionNames
