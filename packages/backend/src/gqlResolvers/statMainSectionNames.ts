import { StatMainSectionNames } from '../../../../sharedTypes/gqlQueries'
import StatisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'

const statisticsMainSectionNames: ResolverFnAsync<StatMainSectionNames> = async () => {
	const mongoRes = await StatisticsModel.aggregate<{ _id: string }>([
		{ $project: { "mainSections.name": 1 } },
		{ $unwind: "$mainSections" },
		{ $group: { _id: "$mainSections.name" } },
		{ $sort: { _id: 1 } }
	])

	return mongoRes.map(({ _id: name }) => ({ name }))
}

export default statisticsMainSectionNames