import { StatisticsMainSectionNames } from '../../../../sharedTypes/gqlQueries'
import StatisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'

const statisticsMainSectionNames: ResolverFnAsync<StatisticsMainSectionNames> = async (
	parent: any,
	args: any,
) => {
	const { regionName } = args
	const mongoRes: ReadonlyArray<string> = await StatisticsModel.find({ regionName }).distinct('mainSections.name')
	return mongoRes
}

export default statisticsMainSectionNames
