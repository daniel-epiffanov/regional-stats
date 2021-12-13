import { MainSectionNamesQuery } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongooseModels/statistics'
import { ResolverFnAsync } from './@types/ResolverFn'

const mainSectionNames: ResolverFnAsync<MainSectionNamesQuery> = async () => {
	const mongoRes: string[] = await statisticsModel.distinct('mainSections.name')
	return mongoRes
}

export default mainSectionNames
