import { StatisticsSubSectionNames } from '../../../../sharedTypes/gqlQueries'
import statisticsModel from '../mongoModels/statistics'
import { ResolverFnAsync } from './types/ResolverFn'

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const statisticsSubSectionNames: ResolverFnAsync<StatisticsSubSectionNames> = async (
	parent: any,
	args: any,
) => {
	const { mainSectionName } = args
	const defaultRegion = process.env.DEFAULT_REGION
	const mongoRes = await statisticsModel.aggregate<{ names: StatisticsSubSectionNames }>([
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
										name: '$$subSection.name',
									},
								},
							},
						},
					},

				},
			},
		},
		{ $unwind: '$mainSections' },
		{ $project: { names: '$mainSections.subSections.name' } },

	])

	return mongoRes[0].names
}

export default statisticsSubSectionNames
