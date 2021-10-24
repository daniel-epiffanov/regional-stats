/* eslint-disable max-len */
import { ResolverFn } from 'graphql-subscriptions'
import { IResolverObject, IResolversParameter } from 'graphql-tools'
import statisticsModel from '../mongooseModels/statistics'

const years: ResolverFn = async (parent, args) => {
	// const { regionName } = args
	// console.log({ args })
	// console.log({ a })
	// console.log({ b })
	const mongoRes = await statisticsModel.distinct('mainSections.subSections.yearValues.year')
	return mongoRes
}

export default years
