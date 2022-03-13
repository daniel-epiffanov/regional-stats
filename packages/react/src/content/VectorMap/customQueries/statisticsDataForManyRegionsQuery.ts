import axios from 'axios'

import {
	MongoMainSection, MongoStatisticsOfRegion, MongoSubSection, MongoStatisticsDataItem,
} from '../../../../../../sharedTypes/mongoModels'

import { hostApi } from '../../../helpers/host'

type Props = Readonly<{
	regionNames: ReadonlyArray<MongoStatisticsOfRegion['regionName']>,
	mainSectionName: MongoMainSection['name'],
	subSectionName: MongoSubSection['name'],
	year: MongoStatisticsDataItem['year']
}>

type StatisticsDataForManyRegionsResponse = Readonly<{
	readonly data: {
		[key: string]: ReadonlyArray<MongoStatisticsDataItem>
	}
}>

type StatisticsDataForManyRegions = Readonly<{
	[key: MongoStatisticsOfRegion['regionName']]: ReadonlyArray<MongoStatisticsDataItem>
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
