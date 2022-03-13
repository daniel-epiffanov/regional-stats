import { useQuery, gql } from '@apollo/client'
import { StatisticsMainSectionNames, SectionsTree } from '../../../../../../sharedTypes/gqlQueries'
import { useGeneralDataContext } from '../../../context/GeneralDataContext'

const sectionsTreeResponseHandler = (
	statisticsMainSectionNames: StatisticsMainSectionNames,
	sectionsTreeResponse: SectionsTree,
) => {
	const correctedSectionsTreeResponse: SectionsTree = {}
	statisticsMainSectionNames.forEach((mainSectionName, i) => {
		correctedSectionsTreeResponse[mainSectionName] = sectionsTreeResponse[`mainSection_${i}`]
	})
	return correctedSectionsTreeResponse
}

const useSectionsTreeItemsQuery = () => {
	const { statisticsMainSectionNames } = useGeneralDataContext()

	// we are forced to have here a data handler and
	// constrictions like "mainSection_${i}: ..." because
	// gql does NOT work with cyrilic

	const QUERY = gql` query {
		${statisticsMainSectionNames.map((name, i) => `mainSection_${i}: statisticsSubSectionNames(mainSectionName:"${name}")`)}
	}`

	const { loading, error, data: sectionsTreeResponse } = useQuery<SectionsTree>(QUERY)

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
