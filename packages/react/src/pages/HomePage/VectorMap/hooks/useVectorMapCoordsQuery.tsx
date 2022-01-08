import { useQuery, gql } from '@apollo/client'
import { StatisticsRegionNamesResponse, CoordsByRegionTypeResponse } from '../../../../../../../sharedTypes/gqlQueries'
import { useSelectionsContext } from '../../context/selectionsContext'

interface QueryResponse {
	coordsByRegionType: CoordsByRegionTypeResponse,
	statisticsRegionNames: StatisticsRegionNamesResponse
}

type ReadonlyQueryResponse = Readonly<QueryResponse>

const useVectorMapCoordsQuery = () => {
	const { selectedRegionTypeOnMap } = useSelectionsContext()
	const QUERY = gql` query {
		coordsByRegionType(type: "${selectedRegionTypeOnMap}") {
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

	const methods = useQuery<ReadonlyQueryResponse>(QUERY)
	// const { loading, error, data } = methods

	return methods
}

export default useVectorMapCoordsQuery
