import axios from 'axios'
import { StatisticsByYearsResponse } from '../../../../sharedTypes/gqlQueries'

import { hostApi } from '../helpers/host'
import GqlResponse from './@types/gqlResponse'

interface Options {
	selectedRegionName: string,
	mainSectionName: string,
	subSectionTitle: string,
	startYear: number
	endYear: number
}

type StatisticsByYearsFn = (options: Options) => Promise<StatisticsByYearsResponse | null>

type SingleSelectionResponse = GqlResponse<{ statisticsByYears: StatisticsByYearsResponse }>

const statisticsByYearsQuery: StatisticsByYearsFn = async (options) => {
	const {
		selectedRegionName, mainSectionName, subSectionTitle, startYear, endYear,
	} = options

	const query = `
	query {
		statisticsByYears (
			regionName: "${selectedRegionName}",
			mainSectionName: "${mainSectionName}",
			subSectionTitle: "${subSectionTitle}",
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
