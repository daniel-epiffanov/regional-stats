import axios from 'axios'
import { MainSectionNamesQuery, MultipleSubSectionNamesQuery, SubSectionNamesQuery } from '../../../../sharedTypes/gqlQueries'

import { hostApi } from '../helpers/host'

type SingleSelectionResponse = { mainSectionNames: MainSectionNamesQuery }

type SubSectionNamesQueryFn = (
	mainSectionNames: MainSectionNamesQuery) => Promise<MultipleSubSectionNamesQuery | null>

const subSectionNamesQuery: SubSectionNamesQueryFn = async (mainSectionNames) => {
	const query = mainSectionNames
		&& mainSectionNames.map((name, i) => `mainSection_${i}: subSectionNames(mainSectionName:"${name}")`)

	const axiosResponse = await axios.post<MultipleSubSectionNamesQuery>(hostApi, { query })
	const subSectionNames = axiosResponse.data
	if (!subSectionNames) return null
	return subSectionNames
}

export default subSectionNamesQuery
