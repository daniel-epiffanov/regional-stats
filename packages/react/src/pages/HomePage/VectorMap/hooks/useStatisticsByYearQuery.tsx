import { useQuery, gql } from '@apollo/client'
import { RegionNamesResponse, CoordsByRegionTypeResponse } from '../../../../../../../sharedTypes/gqlQueries'
import { useSimpleQueriesContext } from '../../../../context/simpleQueriesContext'
import { useSelectionsContext } from '../../context/selectionsContext'

type QueryResponse = {
	coordsByRegionType: CoordsByRegionTypeResponse,
	regionNames: RegionNamesResponse
}

const QUERY = gql` query {
	coordsByRegionType(type: "federalDistrict") {
		type,
		geometry {
			type,
			coordinates
		},
		properties {
			name_en
			name_ru
		}
	},
	regionNames
}`

const useVectorMapCoordsQuery = () => {
	const { regionNames } = useSimpleQueriesContext()
	const { selectedYear, selectedRegionType } = useSelectionsContext()
	const methods = useQuery<QueryResponse>(QUERY)

	const { loading, error, data } = methods

	// console.log({ data })

	return methods
}

export default useVectorMapCoordsQuery
