import { useQuery, gql } from '@apollo/client'
import { RegionNamesQuery, CoordsByRegionTypeQuery } from '../../../../../../sharedTypes/gqlQueries'

type QueryResponse = {
	coordsByRegionType: CoordsByRegionTypeQuery,
	regionNames: RegionNamesQuery
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

const useVectorMapQuery = () => {
	const methods = useQuery<QueryResponse>(QUERY)

	const { loading, error, data } = methods

	// console.log({ data })

	return methods
}

export default useVectorMapQuery
