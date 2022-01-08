import { useQuery, gql } from '@apollo/client'
import { RegionNamesResponse, CoordsByRegionTypeResponse } from '../../../../../../../sharedTypes/gqlQueries'
import { useSelectionsContext } from '../../context/selectionsContext'

type QueryResponse = {
	coordsByRegionType: CoordsByRegionTypeResponse,
	regionNames: RegionNamesResponse
}

const useVectorMapCoordsQuery = () => {
	const { selectedRegionType } = useSelectionsContext()
	const QUERY = gql` query {
		coordsByRegionType(type: "${selectedRegionType}") {
			type,
			geometry {
				type,
				coordinates
			},
			properties {
				name_en
				name_ru
			}
		}
	}`

	const methods = useQuery<QueryResponse>(QUERY)
	// const { loading, error, data } = methods

	return methods
}

export default useVectorMapCoordsQuery
