import { useEffect, useState } from 'react'
import { Item } from 'devextreme/ui/tree_view'
import { MainSectionNamesQuery, MultipleSubSectionNamesQuery } from '../../../../../../sharedTypes/gqlQueries'
import mainSectionNamesQuery from '../../../queries/mainSectionNamesQuery'
import subSectionNamesQuery from '../../../queries/subSectionNamesQuery'

const getDxTreeItems = (subSectionNames: MultipleSubSectionNamesQuery) => {
	if (!subSectionNames) return null
	const mainSectionNames = Object.keys(subSectionNames)

	type GenerateItem = (id: string, text: string, childItems?: string[]) => Item

	const generateItem: GenerateItem = (id, text, childItems) => ({
		id,
		text,
		items: childItems && childItems.map((item, _id) => generateItem(`${id}_${_id}`, item)),
	})

	return mainSectionNames
		.map((mainSectionName, i) => generateItem(`${i}`, mainSectionName, subSectionNames[`mainSection_${i}`]))
}

const useSectionsTreeQuery = () => {
	const [mainSectionNames, setMainSectionNames] = useState<MainSectionNamesQuery | null>(null)

	const [data, setData] = useState<Item[] | undefined>(undefined)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<boolean>(false)

	useEffect(() => {
		(async () => {
			try {
				const fetchedMainSectionNames = await mainSectionNamesQuery()
				if (!fetchedMainSectionNames) return setError(true)
				const fetchedSubSectionNames = await subSectionNamesQuery(fetchedMainSectionNames)
				if (!fetchedSubSectionNames) return setError(true)
				const dxItems = getDxTreeItems(fetchedSubSectionNames)
				if (!dxItems) return setError(true)

				setLoading(false)
				setData(dxItems)
			} catch (err) {
				setError(true)
			}
		})()
	}, [])

	return { data, loading, error }
}

export default useSectionsTreeQuery
