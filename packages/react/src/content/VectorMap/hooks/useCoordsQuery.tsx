import { useQuery, gql } from '@apollo/client'
import { StatRegionNames, RegionCoords } from '../../../../../../sharedTypes/gqlQueries'
import { useSelectionsContext } from '../../context/curValuesContext'

interface QueryResponse {
	regionCoords: RegionCoords,
	statRegionNames: StatRegionNames
}

type ReadonlyQueryResponse = Readonly<QueryResponse>

const useCoordsQuery = () => {
	const { curRegionTypeOnMap: selectedRegionTypeOnMap } = useSelectionsContext()
	const QUERY = gql` query {
		regionCoords(regionType: "region") {
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
	const { loading, error, data } = methods

	return methods
}

export default useCoordsQuery
