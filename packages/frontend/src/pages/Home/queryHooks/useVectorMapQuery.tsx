import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql,
} from '@apollo/client'
import { RegionNamesQuery, MultipleRegionsCoords } from '../../../../../../sharedTypes/gqlQueries'

type QueryResponse = {
	multipleRegionsCoords: MultipleRegionsCoords,
	regionNames: RegionNamesQuery
}

const QUERY = gql`
query {
	multipleRegionsCoords(type: "region") {
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

	return methods
}

export default useVectorMapQuery
