import axios from 'axios'
import { MainSectionNamesQuery, MultipleSubSectionNamesQuery } from '../../../../sharedTypes/gqlQueries'
import { hostApi } from '../helpers/host'
import GqlResponse from './@types/gqlResponse'

type Response = GqlResponse<MultipleSubSectionNamesQuery>

type MultipleSubSectionNamesQueryFn = (
	mainSectionNames: MainSectionNamesQuery) => Promise<MultipleSubSectionNamesQuery | null>

const multipleSubSectionNamesQuery: MultipleSubSectionNamesQueryFn = async (mainSectionNames) => {
	const query = `
		query {
			${mainSectionNames.map((name, i) => `mainSection_${i}: subSectionNames(mainSectionName:"${name}")`)}
		}
	`
	const axiosResponse = await axios.post<Response>(hostApi, { query })
	const subSectionNames = axiosResponse.data.data
	if (!subSectionNames) return null
	return subSectionNames
}

export default multipleSubSectionNamesQuery
