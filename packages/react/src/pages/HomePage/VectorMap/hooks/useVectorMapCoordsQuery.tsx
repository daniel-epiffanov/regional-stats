import { useQuery, gql } from '@apollo/client'
import { RegionNamesResponse, CoordsByRegionTypeResponse } from '../../../../../../../sharedTypes/gqlQueries'

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
	const methods = useQuery<QueryResponse>(QUERY)

	const { loading, error, data } = methods

	// console.log({ data })

	return methods
}

export default useVectorMapCoordsQuery
