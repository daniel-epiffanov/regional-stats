import { IResolverObject, IResolversParameter } from 'graphql-tools'
import statisticsModel from '../mongooseModels/statistics'

const years = async () => {
	const mongoRes = await statisticsModel.distinct('mainSections.subSections.yearValues.year')
	return mongoRes
}

export default years
