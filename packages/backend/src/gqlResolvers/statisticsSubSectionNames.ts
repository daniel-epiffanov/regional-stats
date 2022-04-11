import { StatisticsSubSectionNames } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'

type Args = Readonly<{
	mainSectionName: string,
}>

const statisticsSubSectionNames: ResolverFnAsync<StatisticsSubSectionNames> = async (
	parent: any,
	args: Args,
) => {
	const { mainSectionName } = args
	const mongoRes = await statisticsModel.aggregate<{ subSections: StatisticsSubSectionNames }>([
		{ $unwind: "$mainSections" },
		{ $match: { "mainSections.name": mainSectionName } },
		{ $project: { "mainSections.subSections.name": 1, "mainSections.subSections.children.name": 1 } },
		{ $project: { subSections: "$mainSections.subSections" } }
	])

	return mongoRes[0].subSections
}

export default statisticsSubSectionNames
