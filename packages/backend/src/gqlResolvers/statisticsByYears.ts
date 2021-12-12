import { ResolverFnAsync, StatisticsByYears } from '../../../../sharedTypes/gqlQueries'
import { YearValue } from '../../../../sharedTypes/statistics'
import statisticsModel from '../mongooseModels/statistics'

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const statisticsByYears: ResolverFnAsync<StatisticsByYears> = async (parent: any, args: any) => {
	const {
		regionName, mainSectionName, subSectionTitle, startYear, endYear,
	} = args
	const defaultRegion = process.env.DEFAULT_REGION
	// console.log({ defaultRegion })
	// console.log({ mainSectionName })
	const mongoRes = await statisticsModel.aggregate<{ yearValues: YearValue[] }>([
		{ $match: { regionName: regionName || defaultRegion } },

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
									input: {
										$filter: {
											input: '$$mainSection.subSections',
											as: 'subSection',
											cond: { $eq: ['$$subSection.title', subSectionTitle] },
										},
									},
									as: 'subSection',
									in: {
										orderNumber: '$$subSection.orderNumber',
										title: '$$subSection.title',
										children: '$$subSection.children',
										yearValues: {
											$map: {
												input: {
													$filter: {
														input: '$$subSection.yearValues',
														as: 'yearValue',
														cond: {
															$and: [
																{ $gte: ['$$yearValue.year', startYear] },
																{ $lte: ['$$yearValue.year', endYear] },
															],
														},
													},
												},
												as: 'subSection',
												in: {
													year: '$$subSection.year',
													value: '$$subSection.value',
												},
											},
										},
									},
								},
							},
						},
					},

				},
			},
		},
		{ $unwind: '$mainSections' },
		{ $unwind: '$mainSections.subSections' },
		{
			$project: {
				yearValues: '$mainSections.subSections.yearValues',
			},
		},
	])

	// console.log({ mongoRes })
	// console.log(mongoRes[0].yearValues)
	return mongoRes[0].yearValues
}

export default statisticsByYears
