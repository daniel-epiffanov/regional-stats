/* eslint-disable max-len */
import statisticsModel from '../mongooseModels/statistics'

const regionNames = async (args: any) => {
	console.log({ args })
	const mongoRes = await statisticsModel.distinct('regionName')
	return mongoRes
}

export default regionNames
