import { StatisticsData } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const statisticsData: ResolverFnAsync<StatisticsData> = async (
	parent: any,
	args: any,
) => {
	const {
		regionName, mainSectionName, subSectionName
	} = args

	// const mongoRes = await statisticsModel.aggregate<{ statisticsData: StatisticsData }>([
	// 	{ $match: { regionName } },
	// 	{ $unwind: "$mainSections" },
	// 	{ $match: { "mainSections.name": mainSectionName } },
	// 	{ $unwind: "$mainSections.subSections" },
	// 	{ $match: { "mainSections.subSections.name": subSectionName } },
	// 	{ $project: { "mainSections.subSections.name": 1, "mainSections.subSections.measure": 1, "mainSections.subSections.yearValues": 1 } },
	// 	{ $project: { statisticsData: "$mainSections.subSections" } }
	// ])

	const mongoRes = await statisticsModel.aggregate<{ statisticsData: StatisticsData }>([
		{ $match: { regionName } },
		{ $unwind: "$mainSections" },
		{ $match: { "mainSections.name": mainSectionName } },
		{ $unwind: "$mainSections.subSections" },
		{ $match: { "mainSections.subSections.name": subSectionName } },
		{ $project: { "mainSections.subSections.name": 1, "mainSections.subSections.measure": 1, "mainSections.subSections.yearValues": 1 } },
		{ $project: { statisticsData: "$mainSections.subSections" } }
	])

	return mongoRes[0].statisticsData
}

export default statisticsData
