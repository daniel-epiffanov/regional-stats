import { StatisticsData } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

type Args = Readonly<{
	regionName: string,
	mainSectionName: string,
	subSectionName: string,
	subSectionChildName: string,
}>

const statisticsData: ResolverFnAsync<StatisticsData> = async (
	parent: any,
	args: Args,
) => {
	const {
		regionName, mainSectionName, subSectionName, subSectionChildName
	} = args

	if (!!subSectionChildName) {

		const mongoRes = await statisticsModel.aggregate<StatisticsData>([
			{ $match: { regionName } },
			{ $unwind: "$mainSections" },
			{ $match: { "mainSections.name": mainSectionName } },
			{ $unwind: "$mainSections.subSections" },
			{ $match: { "mainSections.subSections.name": subSectionName } },
			{ $unwind: "$mainSections.subSections.children" },
			{ $match: { "mainSections.subSections.children.name": subSectionChildName } },
			{ $project: { name: "$mainSections.subSections.children.name", measure: "$mainSections.subSections.children.measure", parentMeasure: "$mainSections.subSections.measure", yearValues: "$mainSections.subSections.children.yearValues" } }
		])

		return mongoRes[0]
	}


	const mongoRes = await statisticsModel.aggregate<StatisticsData>([
		{ $match: { regionName } },
		{ $unwind: "$mainSections" },
		{ $match: { "mainSections.name": mainSectionName } },
		{ $unwind: "$mainSections.subSections" },
		{ $match: { "mainSections.subSections.name": subSectionName } },
		{ $project: { name: "$mainSections.subSections.name", measure: "$mainSections.subSections.measure", yearValues: "$mainSections.subSections.yearValues" } }
	])

	return mongoRes[0]
}

export default statisticsData
