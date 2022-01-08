import { useLazyQuery, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { RegionNamesResponse, CoordsByRegionTypeResponse } from '../../../../../../../sharedTypes/gqlQueries'
import { ReadonlyStatistics, ReadonlyYearValue } from '../../../../../../../sharedTypes/mongoModels'
import { useSimpleQueriesContext } from '../../../../context/simpleQueriesContext'
import { useSelectionsContext } from '../../context/selectionsContext'

type QueryResponse = Readonly<{
	[key: string]: ReadonlyYearValue
}>

type StatisticsByYear = Readonly<{
	[key: ReadonlyStatistics['regionName']]: ReadonlyYearValue
}>

// regionNamesOnMap: ReadonlyArray<ReadonlyStatistics['regionName']>
const useStatisticsByYearQuery = (regionNamesOnMapAndStatistics: ReadonlyArray<ReadonlyStatistics['regionName']>) => {
	console.log({ regionNamesOnMapAndStatistics })
	const {
		selectedYearOnMap,
		selectedSubSectionName,
		selectedMainSectionName,
	} = useSelectionsContext()

	const multipleRegionsStatisticsQuery = regionNamesOnMapAndStatistics.map((regionName, i) => `region_${i}: statisticsByYears (
		regionName: "${regionName}",
		mainSectionName: "${selectedMainSectionName}",
		subSectionName: "${selectedSubSectionName}",
		startYear: ${selectedYearOnMap},
		endYear: ${selectedYearOnMap}
	) {
		year,
		value
	}`)

	console.log({ multipleRegionsStatisticsQuery })

	const QUERY = gql` query {
		${multipleRegionsStatisticsQuery},
		regionNames,
	}`
	console.log({ QUERY })

	const [makeQuery, methods] = useLazyQuery<QueryResponse>(QUERY)
	const { loading, error, data } = methods
	const [statisticsByYear, setStatisticsByYear] = useState<StatisticsByYear>({})

	useEffect(() => {
		const isMakingQueryMakesSense = regionNamesOnMapAndStatistics.length > 0
		if (isMakingQueryMakesSense) makeQuery()
	}, [selectedSubSectionName])

	useEffect(() => {
		if (!data) return
		const statisticsByYearEntries = Object.entries(data)
			.map(([indexedRegionName, yearValue], i) => {
				const indexOfRegion = parseInt(indexedRegionName.split('_')[1])
				return [regionNamesOnMapAndStatistics[indexOfRegion], yearValue]
			})
		setStatisticsByYear(Object.fromEntries(statisticsByYearEntries))
	}, [data])

	// console.log({ data })

	return { statisticsByYear }
}

export default useStatisticsByYearQuery
