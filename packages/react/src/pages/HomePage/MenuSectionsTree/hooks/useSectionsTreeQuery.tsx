import { useQuery, gql } from '@apollo/client'
import { StatisticsMainSectionNamesResponse, SectionsTreeResponse } from '../../../../../../../sharedTypes/gqlQueries'
import { useSimpleQueriesContext } from '../../../../context/simpleQueriesContext'

const sectionsTreeResponseHandler = (
	statisticsMainSectionNames: StatisticsMainSectionNamesResponse,
	sectionsTreeResponse: SectionsTreeResponse,
) => {
	const correctedSectionsTreeResponse: SectionsTreeResponse = {}
	statisticsMainSectionNames.forEach((mainSectionName, i) => {
		correctedSectionsTreeResponse[mainSectionName] = sectionsTreeResponse[`mainSection_${i}`]
	})
	return correctedSectionsTreeResponse
}

const useSectionsTreeItemsQuery = () => {
	const { statisticsMainSectionNames } = useSimpleQueriesContext()

	// we are forced to have here a data handler and
	// constrictions like "mainSection_${i}: ..." because
	// gql does NOT work with cyrilic

	const QUERY = gql` query {
		${statisticsMainSectionNames.map((name, i) => `mainSection_${i}: statisticsSubSectionNames(mainSectionName:"${name}")`)}
	}`

	const { loading, error, data: sectionsTreeResponse } = useQuery<SectionsTreeResponse>(QUERY)

	return {
		loading,
		error,
		data: sectionsTreeResponse && sectionsTreeResponseHandler(
			statisticsMainSectionNames,
			sectionsTreeResponse,
		),
	}
}

export default useSectionsTreeItemsQuery
