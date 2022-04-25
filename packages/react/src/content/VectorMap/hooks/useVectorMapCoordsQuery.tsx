// import { useQuery, gql, query } from '@apollo/client'
import { StatRegionNames, RegionCoords } from '../../../../../../sharedTypes/gqlQueries'
// import { useSelectionsContext } from '../../context/selectionsContext'

interface QueryResponse {
	regionCoords: RegionCoords,
	statRegionNames: StatRegionNames
}

type ReadonlyQueryResponse = Readonly<QueryResponse>

const useVectorMapCoordsQuery = () => {
	// const { selectedRegionTypeOnMap } = useSelectionsContext()
	// const QUERY = gql` query {
	// 	regionCoords(type: "${selectedRegionTypeOnMap}") {
	// 		type,
	// 		geometry {
	// 			type,
	// 			coordinates
	// 		},
	// 		properties {
	// 			name_en
	// 			name_ru
	// 		}
	// 	}
	// }`

	// const methods = useQuery<ReadonlyQueryResponse>(QUERY)
	// const { loading, error, data } = methods

	return null//methods
}

export default useVectorMapCoordsQuery
