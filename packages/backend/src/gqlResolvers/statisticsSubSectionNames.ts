import { StatisticsSubSectionNames } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const statisticsSubSectionNames: ResolverFnAsync<StatisticsSubSectionNames> = async (
	parent: any,
	args: any,
) => {
	const { regionName, mainSectionName } = args
	const mongoRes = await statisticsModel.aggregate<{ subSections: StatisticsSubSectionNames }>([
		{ $match: { regionName } },
		{ $unwind: "$mainSections" },
		{ $match: { "mainSections.name": mainSectionName } },
		{ $project: { "mainSections.subSections.name": 1, "mainSections.subSections.children.name": 1 } },
		{ $project: { subSections: "$mainSections.subSections" } }
	])

	return mongoRes[0].subSections
}

export default statisticsSubSectionNames
