import axios from 'axios'
import { MainSectionNamesQuery, MultipleSubSectionNamesQuery } from '../../../../sharedTypes/gqlQueries'
import { hostApi } from '../helpers/host'

type MultipleSubSectionNamesQueryFn = (
	mainSectionNames: MainSectionNamesQuery) => Promise<MultipleSubSectionNamesQuery | null>

const multipleSubSectionNamesQuery: MultipleSubSectionNamesQueryFn = async (mainSectionNames) => {
	const query = mainSectionNames
		&& mainSectionNames.map((name, i) => `mainSection_${i}: subSectionNames(mainSectionName:"${name}")`)

	const axiosResponse = await axios.post<MultipleSubSectionNamesQuery>(hostApi, { query })
	const subSectionNames = axiosResponse.data
	if (!subSectionNames) return null
	return subSectionNames
}

export default multipleSubSectionNamesQuery
