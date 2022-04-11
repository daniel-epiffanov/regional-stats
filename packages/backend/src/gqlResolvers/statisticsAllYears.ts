import { StatisticsYears } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'

const statisticsAllYears: ResolverFnAsync<StatisticsYears> = async (
	parent: any,
	args: any,
) => {
	const mongoRes = await statisticsModel.distinct('mainSections.subSections.yearValues.year')
	return mongoRes
}

export default statisticsAllYears
