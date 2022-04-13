import { StatMainSectionNames } from '../../../../sharedTypes/gqlQueries'
import StatisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'

const statisticsMainSectionNames: ResolverFnAsync<StatMainSectionNames> = async () => {
	const mongoRes = await StatisticsModel.aggregate<{ mainSections: StatMainSectionNames }>([
		{ $project: { "mainSections.name": 1 } },
	])

	return mongoRes[0].mainSections
}

export default statisticsMainSectionNames
