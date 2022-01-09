import axios from 'axios'
import { StatisticsDataResponse } from '../../../../../../../sharedTypes/gqlQueries'

import { hostApi } from '../../../../helpers/host'
import GqlResponse from '../../../../manualQueries/@types/gqlResponse'

interface Options {
	regionName: string,
	mainSectionName: string,
	subSectionName: string,
	startYear: number
	endYear: number
}

type StatisticsByYearsFn = (options: Options) => Promise<StatisticsDataResponse | null>

type SingleSelectionResponse = GqlResponse<{ statisticsData: StatisticsDataResponse }>

const statisticsDataQuery: StatisticsByYearsFn = async (options) => {
	const {
		regionName, mainSectionName, subSectionName: subSectionTitle, startYear, endYear,
	} = options

	const query = `
	query {
		statisticsData (
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
	const { statisticsData } = axiosResponse.data.data
	if (!statisticsData) return null
	return statisticsData
}

export default statisticsDataQuery
