import { SubSectionNamesResponse } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongooseModels/statistics'
import { ResolverFnAsync } from './@types/ResolverFn'

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const subSectionNames: ResolverFnAsync<SubSectionNamesResponse> = async (parent: any, args: any) => {
	const { mainSectionName } = args
	const defaultRegion = process.env.DEFAULT_REGION
	const mongoRes = await statisticsModel.aggregate<{ titles: SubSectionNamesResponse }>([
		{ $match: { regionName: defaultRegion } },

		{
			$project: {
				_id: 0,
				regionName: 1,
				mainSections: {
					$map: {
						input: {
							$filter: {
								input: '$mainSections',
								as: 'mainSection',
								cond: { $eq: ['$$mainSection.name', mainSectionName] },
							},
						},
						as: 'mainSection',
						in: {
							name: '$$mainSection.name',
							subSections: {
								$map: {
									input: '$$mainSection.subSections',
									as: 'subSection',
									in: {
										title: '$$subSection.title',
									},
								},
							},
						},
					},

				},
			},
		},
		{ $unwind: '$mainSections' },
		{ $project: { titles: '$mainSections.subSections.title' } },

	])

	return mongoRes[0].titles
}

export default subSectionNames
