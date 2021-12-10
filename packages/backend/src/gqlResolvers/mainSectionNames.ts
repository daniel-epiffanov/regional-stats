import { MainSectionNames, ResolverFnAsync } from '../../../../sharedTypes/gqlResolvers'
import { MainSection } from '../../../../sharedTypes/statistics'
import statisticsModel from '../mongooseModels/statistics'

const mainSectionNames: ResolverFnAsync<MainSectionNames> = async () => {
	const mongoRes: MainSection['name'][] = await statisticsModel.distinct('mainSections.name')
	return mongoRes
}

export default mainSectionNames
