import { ResolverFnAsync, Years } from '../../../../@types/gqlResolvers.d'
import statisticsModel from '../mongooseModels/statistics'

const years: ResolverFnAsync<Years> = async (parent, args, ctx) => {
	const mongoRes = await statisticsModel.distinct('mainSections.subSections.yearValues.year')
	return mongoRes
}

export default years
