import axios from 'axios'
import { StatisticsByYearsResponse } from '../../../../sharedTypes/gqlQueries'

import { hostApi } from '../helpers/host'
import GqlResponse from './@types/gqlResponse'

interface Options {
	regionName: string,
	mainSectionName: string,
	subSectionName: string,
	startYear: number
	endYear: number
}

type StatisticsByYearsFn = (options: Options) => Promise<StatisticsByYearsResponse | null>

type SingleSelectionResponse = GqlResponse<{ statisticsByYears: StatisticsByYearsResponse }>

const statisticsByYearsQuery: StatisticsByYearsFn = async (options) => {
	const {
		regionName, mainSectionName, subSectionName: subSectionTitle, startYear, endYear,
	} = options

	const query = `
	query {
		statisticsByYears (
			regionName: "${regionName}",
			mainSectionName: "${mainSectionName}",
			subSectionName: "${subSectionTitle}",
			startYear: ${startYear},
			endYear: ${endYear}
		) {
			year,
			value
		}
	}`

	const axiosResponse = await axios.post<SingleSelectionResponse>(hostApi, { query })
	const { statisticsByYears } = axiosResponse.data.data
	if (!statisticsByYears) return null
	return statisticsByYears
}

export default statisticsByYearsQuery
