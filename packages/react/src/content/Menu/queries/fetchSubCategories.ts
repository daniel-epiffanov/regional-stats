import axios from "axios"
import { StatSubCategories } from "../../../../../../sharedTypes/gqlQueries"
import { hostApi } from "../../../helpers/host"


type SubSectionDataResponse = Readonly<{
	data: {
		statSubCategories: StatSubCategories
	}
}>

const fetchSubCategories = async (mainSectionName: string) => {

	const query = `query {
		statSubCategories(mainSectionName: "${mainSectionName}") {
      name,
			children {
				name
			}
    }
	}`

	try {
		const axiosResponse = await axios.post<SubSectionDataResponse>(hostApi, { query })
		const { data } = axiosResponse.data
		if(!data?.statSubCategories) return null

		// const subSectionNames = statSubCategories.map(subSectionName => subSectionName.name)

		return data.statSubCategories
		
	} catch (error) {
		console.error({error})
		return null
	}



}

export default fetchSubCategories;
