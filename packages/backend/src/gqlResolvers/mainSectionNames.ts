import statisticsModel from '../mongooseModels/statistics'

const mainSectionNames = async () => {
	const mongoRes = await statisticsModel.distinct('mainSections.name')
	return mongoRes
}

export default mainSectionNames
