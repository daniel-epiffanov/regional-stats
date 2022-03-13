import axios from 'axios'
import {
	StatisticsOfRegion,
	StatisticsOfMainSection,
	StatisticsOfSubSection,
	StatisticsDataItem,
} from '../../../../../../sharedTypes/mongoModels'

import { hostApi } from '../../../helpers/host'

type Props = Readonly<{
	regionNames: ReadonlyArray<StatisticsOfRegion['regionName']>,
	mainSectionName: StatisticsOfMainSection['name'],
	subSectionName: StatisticsOfSubSection['name'],
	year: StatisticsDataItem['year']
}>

type StatisticsDataForManyRegionsResponse = Readonly<{
	readonly data: {
		[key: string]: ReadonlyArray<StatisticsDataItem>
	}
}>

type StatisticsDataForManyRegions = Readonly<{
	[key: StatisticsOfRegion['regionName']]: ReadonlyArray<StatisticsDataItem>
}>

const statisticsDataForManyRegionsQuery = async (props: Props) => {
	const {
		regionNames,
		mainSectionName,
		subSectionName,
		year,
	} = props

	const multipleRegionsStatisticsQuery = regionNames.map((regionName, i) => `region_${i}: statisticsData (
		regionName: "${regionName}",
		mainSectionName: "${mainSectionName}",
		subSectionName: "${subSectionName}",
		startYear: ${year},
		endYear: ${year}
	) {
		year,
		value
	}`)

	const query = `query{
		${multipleRegionsStatisticsQuery}
	}`

	const axiosResponse = await axios.post<StatisticsDataForManyRegionsResponse>(hostApi, { query })
	const { data } = axiosResponse.data

	if (!data || Object.entries(data).length === 0) return null

	const statisticsDataEntries = Object.entries(data)
		.map(([indexedRegionName, statisticsData], i) => {
			const indexOfRegion = parseInt(indexedRegionName.split('_')[1])
			return [regionNames[indexOfRegion], statisticsData]
		})

	const statisticsData: StatisticsDataForManyRegions = Object.fromEntries(statisticsDataEntries)

	return statisticsData
}

export default statisticsDataForManyRegionsQuery
