import statisticsModel from '../mongooseModels/statistics'

const regionNames = async () => {
	const mongoRes = await statisticsModel.distinct('regionName')
	return mongoRes
}

export default regionNames
