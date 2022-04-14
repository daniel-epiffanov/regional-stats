import { StatSubSectionNames } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'
import _ from 'lodash'

type Args = Readonly<{
	mainSectionName: string,
}>


const statisticsSubSectionNames: ResolverFnAsync<StatSubSectionNames | null> = async (
	parent: any,
	args: Args,
) => {
	const { mainSectionName } = args

	const mongoRes = await statisticsModel.aggregate<{ _id: StatSubSectionNames[0] }>([
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

	let draftStatSubSectionNames: {
		name: string,
		children: {
			name: string
		}[] | null
	}[] = []




	for (let rawSubSectionNamesIndex = 0; rawSubSectionNamesIndex < rawSubSectionNames.length; rawSubSectionNamesIndex++) {
		const rawSubSectionName = rawSubSectionNames[rawSubSectionNamesIndex];

		const alreadyExist = !!draftStatSubSectionNames.find(rawStatSubSectionName => rawStatSubSectionName.name === rawSubSectionName.name)
		if (alreadyExist) continue

		if (!!rawSubSectionName.children) {
			const childrenMongoRes = await statisticsModel.aggregate<{ _id: string }>([
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

			draftStatSubSectionNames.push({
				name: rawSubSectionName.name,
				children: childrenMongoRes.length === 0 ? null : childrenMongoRes.map(({ _id: subSectionChildName }) => ({ name: subSectionChildName }))
			})

			continue
		}

		draftStatSubSectionNames.push({
			name: rawSubSectionName.name,
			children: null
		})

	}

	const statSubSectionNames: StatSubSectionNames = [...draftStatSubSectionNames]

	return statSubSectionNames?.length > 0 ? statSubSectionNames : null
}

export default statisticsSubSectionNames
