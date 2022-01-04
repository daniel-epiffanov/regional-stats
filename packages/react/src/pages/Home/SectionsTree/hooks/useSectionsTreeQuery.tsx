import { useQuery, gql } from '@apollo/client'
import { SectionsTreeQuery } from '../../../../../../../sharedTypes/gqlQueries'
import { useSimpleQueriesContext } from '../../../../context/simpleQueries'

const useSectionsTreeItemsQuery = () => {
	const { mainSectionNames } = useSimpleQueriesContext()

	const QUERY = gql` query {
		${mainSectionNames.map((name, i) => `mainSection_${i}: subSectionNames(mainSectionName:"${name}")`)}
	}`

	const { loading, error, data } = useQuery<SectionsTreeQuery>(QUERY)

	return { loading, error, data }
}

export default useSectionsTreeItemsQuery
