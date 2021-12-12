import { Years } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongooseModels/statistics'
import { ResolverFnAsync } from './@types/ResolverFn'

const years: ResolverFnAsync<Years> = async (parent, args, ctx) => {
	const mongoRes = await statisticsModel.distinct('mainSections.subSections.yearValues.year')
	return mongoRes
}

export default years
