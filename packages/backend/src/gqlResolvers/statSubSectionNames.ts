import { StatSubSectionNames } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'

type Args = Readonly<{
	mainSectionName: string,
}>

const statisticsSubSectionNames: ResolverFnAsync<StatSubSectionNames> = async (
	parent: any,
	args: Args,
) => {
	const { mainSectionName } = args
	// const mongoRes = await statisticsModel.aggregate<{ subSections: StatSubSectionNames }>([
	// 	{ $unwind: "$mainSections" },
	// 	{ $match: { "mainSections.name": mainSectionName } },
	// 	{ $project: { "mainSections.subSections.name": 1, "mainSections.subSections.children.name": 1 } },
	// 	{ $project: { subSections: "$mainSections.subSections" } }
	// ])

	// fetching all top lvl sub Sections

	const mongoRes = await statisticsModel.aggregate<{ subSections: StatSubSectionNames }>([
		{ $unwind: "$mainSections" },
		{ $match: { "mainSections.name": mainSectionName } },
		{ $project: { "mainSections.subSections.name": 1, "mainSections.subSections.children.name": 1 } },
		{ $project: { subSections: "$mainSections.subSections" } },
		{ $unwind: "$subSections" },
		{ $group: { _id: "$subSections.name" } },
	])


	return mongoRes
}

export default statisticsSubSectionNames
