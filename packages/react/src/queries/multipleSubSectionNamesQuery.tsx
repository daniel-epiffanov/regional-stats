import axios from 'axios'
import { MainSectionNamesQuery, SectionsTreeQuery } from '../../../../sharedTypes/gqlQueries'
import { hostApi } from '../helpers/host'
import GqlResponse from './@types/gqlResponse'

type Response = GqlResponse<SectionsTreeQuery>

type MultipleSubSectionNamesQueryFn = (
	mainSectionNames: MainSectionNamesQuery) => Promise<SectionsTreeQuery | null>

const multipleSubSectionNamesQuery: MultipleSubSectionNamesQueryFn = async (mainSectionNames) => {
	const query = `
		query {
			${mainSectionNames.map((name, i) => `mainSection_${i}: subSectionNames(mainSectionName:"${name}")`)}
		}
	`
	const axiosResponse = await axios.post<Response>(hostApi, { query })
	const multipleSubSectionNames = axiosResponse.data.data
	if (!multipleSubSectionNames) return null

	const correctedMultipleSubSectionNames: SectionsTreeQuery = {}
	mainSectionNames.forEach((mainSectionName, i) => {
		correctedMultipleSubSectionNames[mainSectionName] = multipleSubSectionNames[`mainSection_${i}`]
	})

	console.log({ correctedMultipleSubSectionNames })

	return correctedMultipleSubSectionNames
}

export default multipleSubSectionNamesQuery
