import { MainSectionNamesQuery } from '../../../../sharedTypes/gqlQueries'
import { MainSection } from '../../../../sharedTypes/regionStatistics'
import statisticsModel from '../mongooseModels/statistics'
import { ResolverFnAsync } from './@types/ResolverFn'

const mainSectionNames: ResolverFnAsync<MainSectionNamesQuery> = async () => {
	const mongoRes: MainSection['name'][] = await statisticsModel.distinct('mainSections.name')
	return mongoRes
}

export default mainSectionNames
