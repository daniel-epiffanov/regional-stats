import axios from "axios"
import { StatSubSectionNames } from "../../../../../../sharedTypes/gqlQueries"
import { hostApi } from "../../../helpers/host"


type SubSectionDataResponse = Readonly<{
	data: {
		statSubSectionNames: StatSubSectionNames
	}
}>

const getSubSectionNamesData = async (mainSectionName: string) => {

	const query = `query {
		statSubSectionNames(mainSectionName: "${mainSectionName}") {
      name,
			children {
				name
			}
    }
	}`

	try {
		const axiosResponse = await axios.post<SubSectionDataResponse>(hostApi, { query })
		const { data } = axiosResponse.data
		if(!data?.statSubSectionNames) return null

		// const subSectionNames = statSubSectionNames.map(subSectionName => subSectionName.name)

		return data.statSubSectionNames
		
	} catch (error) {
		console.error({error})
		return null
	}



}

export default getSubSectionNamesData