import axios from 'axios'
import {
	ReadonlyStatisticsOfRegion,
	ReadonlyStatisticsOfMainSection,
	ReadonlyStatisticsOfSubSection,
	ReadonlyStatisticsData,
} from '../../../../../../../sharedTypes/mongoModels.d'

import { hostApi } from '../../../../helpers/host'

type Props = Readonly<{
	regionNames: ReadonlyArray<ReadonlyStatisticsOfRegion['regionName']>,
	mainSectionName: ReadonlyStatisticsOfMainSection['name'],
	subSectionName: ReadonlyStatisticsOfSubSection['name'],
	year: ReadonlyStatisticsData['year']
}>

type StatisticsDataForManyRegionsResponse = Readonly<{
	readonly data: {
		[key: string]: ReadonlyStatisticsData
	}
}>

type StatisticsDataForManyRegions = Readonly<{
	[key: ReadonlyStatisticsOfRegion['regionName']]: ReadonlyStatisticsData
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
