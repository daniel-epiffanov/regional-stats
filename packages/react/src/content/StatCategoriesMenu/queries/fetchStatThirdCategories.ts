import axios from "axios"
import { StatCategories } from "../../../../../../sharedTypes/gqlQueries"
import { hostApi } from "../../../helpers/host"


type StatThirdCategoriesDataResponse = Readonly<{
	data: {
		statThirdCategories: StatCategories
	}
}>

const fetchStatThirdCategories = async (statFirstCategory: string, statSecondCategory: string) => {

	const query = `query {
		statThirdCategories(firstCategory: "${statFirstCategory}", secondCategory: "${statSecondCategory}")
	}`

	try {
		const axiosResponse = await axios.post<StatThirdCategoriesDataResponse>(hostApi, { query })
		const { data } = axiosResponse.data
		if(!data?.statThirdCategories ||
			data.statThirdCategories.length === 0) return null

		return data.statThirdCategories
		
	} catch (error) {
		console.error({error})
		return null
	}



}

export default fetchStatThirdCategories;
