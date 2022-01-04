import { StatisticsByYearsResponse } from '../../../../sharedTypes/gqlQueries'
import { ReadonlyYearValue } from '../../../../sharedTypes/mongoModels'
import statisticsModel from '../mongooseModels/statistics'
import { ResolverFnAsync } from './@types/ResolverFn'

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const statisticsByYears: ResolverFnAsync<StatisticsByYearsResponse> = async (
	parent: any, args: any,
) => {
	const {
		regionName, mainSectionName, subSectionName, startYear, endYear,
	} = args
	const defaultRegion = process.env.DEFAULT_REGION
	// console.log({ defaultRegion })
	// console.log({ mainSectionName })
	const mongoRes = await statisticsModel.aggregate<{ yearValues: ReadonlyYearValue[] }>([
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
											cond: { $eq: ['$$subSection.title', subSectionName] },
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

	return mongoRes[0].yearValues
}

export default statisticsByYears
