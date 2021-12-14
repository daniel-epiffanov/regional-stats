import { useQuery, gql, useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Item } from 'devextreme/ui/tree_view'
import { MainSectionNamesQuery } from '../../../../../../sharedTypes/gqlQueries'

type MainSectionNamesQueryResponse = {
	mainSectionNames: MainSectionNamesQuery,
}

type SubSectionNamesQueryResponse = {
	[key: string]: string[]
}

const mainSectionsQuery = gql`query {
	mainSectionNames,
}`

const useSectionsTreeQuery = () => {
	const msQueryMethods = useQuery<MainSectionNamesQueryResponse>(mainSectionsQuery)
	const mainSectionNames = msQueryMethods.data?.mainSectionNames

	const subSectionNamesQuery = mainSectionNames
		&& mainSectionNames.map((name, i) => `var_${i}: subSectionNames(mainSectionName:"${name}")`)

	const [getSsNames, ssQueryMethods] = useLazyQuery<SubSectionNamesQueryResponse>(gql` query {
		${subSectionNamesQuery}
	}`)
	const [returnData, setReturnData] = useState<Item[] | undefined>(undefined)

	useEffect(() => {
		getSsNames()
	}, [mainSectionNames])

	const { data } = ssQueryMethods

	useEffect(() => {
		if (!mainSectionNames) return
		if (!data) return

		type GenerateItem = (id: string, text: string, childItems?: string[]) => Item

		const generateItem: GenerateItem = (id, text, childItems) => ({
			id,
			text,
			items: childItems && childItems.map((item, _id) => generateItem(`${id}_${_id}`, item)),
		})

		const items = mainSectionNames.map((mainSectionName, i) => generateItem(`${i}`, mainSectionName, data[`var_${i}`]))

		setReturnData(items)
	}, [data])

	return { ...ssQueryMethods, data: returnData }
}

export default useSectionsTreeQuery
