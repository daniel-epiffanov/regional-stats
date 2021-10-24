/* eslint-disable max-len */
// import graphqlFields from 'graphql-fields'
// import mapCoordsModel from '../mongooseModels/mapCoords'
// import statisticsModel from '../mongooseModels/statistics'
import { IResolvers } from 'graphql-tools'
import years from './years'
import regionNames from './regionNames'

const gqlResolvers: IResolvers = {
	Query: {
		years,
		regionNames,
		// statistics: async (args: any) => {
		// 	console.log({ args })
		// 	const mongoRes = await statisticsModel.find({ regionName: 'Центральный федеральный округ' }).select({ 'mainSections.name': 'Население' })
		// 	return mongoRes
		// },
		// mapCoords: async (parent: any, args: any, context: any, info: any) => {
		// 	console.info(`requested mapCoords at ${new Date().toLocaleString()}`)
		// 	const requestedFields = Object.keys(graphqlFields(info))
		// 	const {
		// 		input, limit, sort, skip, propertiesFilter,
		// 	} = args

		// 	console.log({ input })
		// 	console.log({ requestedFields })

		// 	// *** input.name_ru && { $regex: input.name_ru, $options: 'i' }
		// 	console.log('starting')
		// 	const coords = await mapCoordsModel
		// 		.find(input)
		// 		.select(requestedFields)
		// 		.limit(limit || 9999)
		// 		.sort(sort || null)
		// 		.skip(skip || 0)

		// 	console.log('finished')
		// 	return coords
		// },
	},
}

export default gqlResolvers
