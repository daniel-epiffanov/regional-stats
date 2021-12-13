import axios from 'axios'
// import { StatisticsByYears, GqlResponse } from '../../../../sharedTypes/gqlResolvers'

// import { hostApi } from '../helpers/host'

// interface Options {
// 	selectedRegion: string,
// 	mainSectionName: string,
// 	subSectionTitle: string,
// 	startYear: number
// 	endYear: number
// }

// type StatisticsByYearsFn = (options: Options) => Promise<StatisticsByYears | null>

// type SingleSelectionResponse = GqlResponse<{ statisticsByYears: StatisticsByYears }>

const statisticsByYearsQuery = async (options: any) => {
	const {
		selectedRegion, mainSectionName, subSectionTitle, startYear, endYear,
	} = options

	// const query = `
	// query {
	// 	statisticsByYears (
	// 		regionName: "${selectedRegion}",
	// 		mainSectionName: "${mainSectionName}",
	// 		subSectionTitle: "${subSectionTitle}",
	// 		startYear: ${startYear},
	// 		endYear: ${endYear}
	// 	) {
	// 		year,
	// 		value
	// 	}
	// }`

	// const axiosResponse = await axios.post<SingleSelectionResponse>(hostApi, { query })
	// const { statisticsByYears } = axiosResponse.data.data
	// if (!statisticsByYears) return null
	// return statisticsByYears
	return null
}

export default statisticsByYearsQuery
