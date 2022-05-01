import axios from 'axios'
import { StatData } from '../../../../../../sharedTypes/gqlQueries'
import { hostApi } from '../../../helpers/host'

type Props = Readonly<{
	regionNames: ReadonlyArray<string>,
	mainSectionName: string
	subSectionName: string
	subSectionChildName?: string
}>

type StatDataResponse = Readonly<{
	readonly data: {
		[key: string]: StatData
	}
}>

const getStatData = async (props: Props) => {
	const {
		regionNames,
		mainSectionName,
		subSectionName,
		subSectionChildName
	} = props

	const subSectionChildNamePar = subSectionChildName ? `subSectionChildName: "${subSectionChildName}"` : ''

	const statDataQuery = regionNames.map((regionName, i) => `region_${i}: statData (
		regionName: "${regionName}",
		mainSectionName: "${mainSectionName}",
		subSectionName: "${subSectionName}",
		${subSectionChildNamePar}
	) {
		name,
    measure,
    parentMeasure,
    yearValues {
      year
    }
	}`)

	// debugger

	const query = `query{
		${statDataQuery}
	}`

	const axiosResponse = await axios.post<StatDataResponse>(hostApi, { query })
	const { data } = axiosResponse.data

	if (!data || Object.entries(data).length === 0) return null

	const statDataEntries = Object.entries(data)
		.map(([indexedRegionName, statisticsData], i) => {
			const indexOfRegion = parseInt(indexedRegionName.split('_')[1])
			return [regionNames[indexOfRegion], statisticsData]
		})

	const statData: Readonly<{
    [key: string]: StatData
}> | null = Object.fromEntries(statDataEntries)

	return statData
}

export default getStatData
