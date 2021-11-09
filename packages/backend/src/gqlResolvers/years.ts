import statisticsModel from '../mongooseModels/statistics'

type ResolverFn = (parent: any, args: any, ctx: Context) => any;
interface ResolverMap {
	[field: string]: ResolverFn;
}
interface Resolvers {
	Query: ResolverMap;
	Character: ResolverMap;
	TvSeason: ResolverMap;
	House: ResolverMap;
}

const years: ResolverFn = async (parent, args, ctx) => {
	const mongoRes = await statisticsModel.distinct('mainSections.subSections.yearValues.year')
	return mongoRes
}

export default years
