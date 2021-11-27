import { MainSectionNames, ResolverFnAsync } from '../../../../@types/gqlResolvers'
import { MainSection } from '../../../../@types/statistics'
import statisticsModel from '../mongooseModels/statistics'

const mainSectionNames: ResolverFnAsync<MainSectionNames> = async () => {
	const mongoRes: MainSection['name'][] = await statisticsModel.distinct('mainSections.name')
	return mongoRes
}

export default mainSectionNames
