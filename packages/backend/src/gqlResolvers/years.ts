/* eslint-disable max-len */
import statisticsModel from '../mongooseModels/statistics'

const years = async (args: any) => {
	console.log({ args })
	// const mongoRes = await statisticsModel.find({ regionName: 'Центральный федеральный округ' }).select({ 'mainSections.name': 'Население' })
	return [1, 2, 3]
}

export default years
