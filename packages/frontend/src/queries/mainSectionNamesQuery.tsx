import axios from 'axios'
import { MainSectionNamesQuery } from '../../../../sharedTypes/gqlQueries'

import { hostApi } from '../helpers/host'

type SingleSelectionResponse = { mainSectionNames: MainSectionNamesQuery }

type mainSectionNamesQueryFn = () => Promise<MainSectionNamesQuery | null>

const mainSectionNamesQuery: mainSectionNamesQueryFn = async () => {
	const query = `
	query {
		mainSectionNames
	}`

	const axiosResponse = await axios.post<SingleSelectionResponse>(hostApi, { query })
	const mainSectionNames = axiosResponse.data.mainSectionNames
	if (!mainSectionNames) return null
	return mainSectionNames
}

export default mainSectionNamesQuery
