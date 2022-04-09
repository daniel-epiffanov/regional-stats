import { StatisticsMainSectionNames } from '../../../../sharedTypes/gqlQueries'
import StatisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'

const statisticsMainSectionNames: ResolverFnAsync<StatisticsMainSectionNames> = async (
	parent: any,
	args: any,
) => {
	const { regionName } = args
	const mongoRes = await StatisticsModel.aggregate<{ mainSections: StatisticsMainSectionNames }>([
		{ $match: { regionName } },
		{ $project: { "mainSections.name": 1 } },
	])

	// console.log({ mongoRes })
	// console.log({ mainSections: mongoRes[0].mainSections })

	return mongoRes[0].mainSections
}

export default statisticsMainSectionNames
