import { useQuery, gql } from '@apollo/client'
import { StatisticsMainSectionNames, StatisticsSectionsTree } from '../../../../../../sharedTypes/gqlQueries'
import { useGeneralDataContext } from '../../../context/GeneralDataContext'

const sectionsTreeResponseHandler = (
	statisticsMainSectionNames: StatisticsMainSectionNames,
	statisticsSectionsTree: StatisticsSectionsTree,
) => {
	const correctedSectionsTreeResponse: StatisticsSectionsTree = {}
	statisticsMainSectionNames.forEach((mainSectionName, i) => {
		correctedSectionsTreeResponse[mainSectionName] = statisticsSectionsTree[`mainSection_${i}`]
	})
	return correctedSectionsTreeResponse
}

const useStatisticsSectionsTreeQuery = () => {
	const { statisticsMainSectionNames } = useGeneralDataContext()

	// we are forced to have here a data handler and
	// constrictions like "mainSection_${i}: ..." because
	// gql does NOT work with cyrilic

	const QUERY = gql` query {
		${statisticsMainSectionNames.map((name, i) => `mainSection_${i}: statisticsSubSectionNames(mainSectionName:"${name}")`)}
	}`

	const { loading, error, data } = useQuery<StatisticsSectionsTree>(QUERY)

	return {
		loading,
		error,
		data: data && sectionsTreeResponseHandler(
			statisticsMainSectionNames,
			data,
		),
	}
}

export default useStatisticsSectionsTreeQuery
