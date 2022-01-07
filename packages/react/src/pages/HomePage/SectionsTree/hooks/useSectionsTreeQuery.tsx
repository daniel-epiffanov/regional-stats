import { useQuery, gql } from '@apollo/client'
import { MainSectionNamesResponse, SectionsTreeResponse } from '../../../../../../../sharedTypes/gqlQueries'
import { useSimpleQueriesContext } from '../../../../context/simpleQueriesContext'

const sectionsTreeResponseHandler = (
	mainSectionNames: MainSectionNamesResponse,
	sectionsTreeResponse: SectionsTreeResponse,
) => {
	const correctedSectionsTreeResponse: SectionsTreeResponse = {}
	mainSectionNames.forEach((mainSectionName, i) => {
		correctedSectionsTreeResponse[mainSectionName] = sectionsTreeResponse[`mainSection_${i}`]
	})
	return correctedSectionsTreeResponse
}

const useSectionsTreeItemsQuery = () => {
	const { mainSectionNames } = useSimpleQueriesContext()

	// we are forced to have here a data handler and
	// constrictions like "mainSection_${i}: ..." because
	// gql does NOT work with cyrilic

	const QUERY = gql` query {
		${mainSectionNames.map((name, i) => `mainSection_${i}: subSectionNames(mainSectionName:"${name}")`)}
	}`

	const { loading, error, data: sectionsTreeResponse } = useQuery<SectionsTreeResponse>(QUERY)

	return {
		loading,
		error,
		data: sectionsTreeResponse && sectionsTreeResponseHandler(
			mainSectionNames,
			sectionsTreeResponse,
		),
	}
}

export default useSectionsTreeItemsQuery
