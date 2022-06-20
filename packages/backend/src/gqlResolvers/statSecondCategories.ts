import { StatCategories } from '../../../../sharedTypes/gqlQueries'
import StatisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'
import _ from 'lodash'

type Args = Readonly<{
	firstCategory: string,
}>

export const getSubCategories = async (mainCategory: string) => {
	const mongoRes = await StatisticsModel.aggregate<{ _id: StatCategories[0] }>([
		{ $unwind: "$mainSections" },
		{ $match: { "mainSections.name": mainCategory } },
		{ $project: { "mainSections.subSections.name": 1, "mainSections.subSections.children.name": 1 } },
		{ $project: { subSections: "$mainSections.subSections" } },
		{ $unwind: "$subSections" },
		{ $group: { _id: "$subSections.name" } },
		{ $sort: { _id: 1 } }
	])

	const rawSubSectionNames = mongoRes.map(({ _id }) => {
		return _id
	})
	return rawSubSectionNames
}


const statSecondCategories: ResolverFnAsync<StatCategories | null> = async (
	parent: any,
	args: Args,
) => {
	const { firstCategory } = args

	console.log({firstCategory})

	return await getSubCategories(firstCategory)
}

export default statSecondCategories
