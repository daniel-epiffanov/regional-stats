import { ResolverFnAsync, SubSectionTitles } from '../../../../@types/gqlResolvers'
import statisticsModel from '../mongooseModels/statistics'

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const subSectionTitles: ResolverFnAsync<SubSectionTitles> = async (parent: any, args: any) => {
	const { mainSectionName } = args
	const defaultRegion = process.env.DEFAULT_REGION
	// console.log({ defaultRegion })
	// console.log({ mainSectionName })
	const mongoRes = await statisticsModel.aggregate<{ titles: string[] }>([
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

	// console.log({ mongoRes })
	return mongoRes[0].titles
}

export default subSectionTitles
