import statisticsModel from '../mongooseModels/statistics'

type ResolverFn = (parent: any, args: any, ctx: any) => any;

const years: ResolverFn = async (parent, args, ctx) => {
	const mongoRes = await statisticsModel.distinct('mainSections.subSections.yearValues.year')
	return mongoRes
}

export default years
