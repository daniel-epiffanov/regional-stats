import { StatSubCategories } from '../../../../sharedTypes/gqlQueries'
import StatisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'
import _ from 'lodash'

type Args = Readonly<{
	mainSectionName: string,
}>


const statSubCategories: ResolverFnAsync<StatSubCategories | null> = async (
	parent: any,
	args: Args,
) => {
	const { mainSectionName } = args

	const mongoRes = await StatisticsModel.aggregate<{ _id: StatSubCategories[0] }>([
		{ $unwind: "$mainSections" },
		{ $match: { "mainSections.name": mainSectionName } },
		{ $project: { "mainSections.subSections.name": 1, "mainSections.subSections.children.name": 1 } },
		{ $project: { subSections: "$mainSections.subSections" } },
		{ $unwind: "$subSections" },
		{ $group: { _id: { name: "$subSections.name", children: "$subSections.children" } } },
		{ $sort: { _id: 1 } }
	])

	const rawSubSectionNames = mongoRes.map(({ _id }) => {
		return _id
	})

	let draftstatSubCategories: {
		name: string,
		children: {
			name: string
		}[] | null
	}[] = []




	for (let rawSubSectionNamesIndex = 0; rawSubSectionNamesIndex < rawSubSectionNames.length; rawSubSectionNamesIndex++) {
		const rawSubSectionName = rawSubSectionNames[rawSubSectionNamesIndex];

		const alreadyExist = !!draftstatSubCategories.find(rawStatSubCategory => rawStatSubCategory.name === rawSubSectionName.name)
		if (alreadyExist) continue

		if (!!rawSubSectionName.children) {
			const childrenMongoRes = await StatisticsModel.aggregate<{ _id: string }>([
				{ $unwind: "$mainSections" },
				{ $match: { "mainSections.name": mainSectionName } },
				{ $project: { "mainSections.subSections.name": 1, "mainSections.subSections.children.name": 1 } },
				{ $project: { subSections: "$mainSections.subSections" } },
				{ $unwind: "$subSections" },
				{ $match: { "subSections.name": rawSubSectionName.name } },
				{ $unwind: "$subSections.children" },
				{ $group: { _id: "$subSections.children.name" } },
				{ $sort: { _id: 1 } }
			])

			draftstatSubCategories.push({
				name: rawSubSectionName.name,
				children: childrenMongoRes.length === 0 ? null : childrenMongoRes.map(({ _id: subSectionChildName }) => ({ name: subSectionChildName }))
			})

			continue
		}

		draftstatSubCategories.push({
			name: rawSubSectionName.name,
			children: null
		})

	}

	const statSubCategories: StatSubCategories = [...draftstatSubCategories]

	return statSubCategories?.length > 0 ? statSubCategories : null
}

export default statSubCategories
