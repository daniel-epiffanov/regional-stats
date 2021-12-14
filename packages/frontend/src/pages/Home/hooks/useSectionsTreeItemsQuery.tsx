import { useEffect, useState } from 'react'
import { Item } from 'devextreme/ui/tree_view'
import { MultipleSubSectionNamesQuery } from '../../../../../../sharedTypes/gqlQueries'
import mainSectionNamesQuery from '../../../queries/mainSectionNamesQuery'
import multipleSubSectionNamesQuery from '../../../queries/multipleSubSectionNamesQuery'

type GenerateItem = (id: string, text: string, childItems?: string[]) => Item

const getDxTreeItems = (multipleSubSectionNames: MultipleSubSectionNamesQuery) => {
	if (!multipleSubSectionNames) return null
	const mainSectionNames = Object.keys(multipleSubSectionNames)

	const generateItem: GenerateItem = (id, text, childItems) => ({
		id,
		text,
		items: childItems && childItems.map((item, _id) => generateItem(`${id}_${_id}`, item)),
	})

	return mainSectionNames
		.map((mainSectionName, i) => generateItem(`${i}`, mainSectionName, multipleSubSectionNames[mainSectionName]))
}

const useSectionsTreeItemsQuery = () => {
	const [data, setData] = useState<Item[] | undefined>(undefined)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<boolean>(false)
	const errorHandler = () => {
		setError(true)
		setLoading(false)
	}

	useEffect(() => {
		(async () => {
			try {
				const fetchedMainSectionNames = await mainSectionNamesQuery()
				console.log({ fetchedMainSectionNames })
				if (!fetchedMainSectionNames) return errorHandler()
				const fetchedMultipleSubSectionNames = await multipleSubSectionNamesQuery(
					fetchedMainSectionNames,
				)
				console.log({ fetchedMultipleSubSectionNames })
				if (!fetchedMultipleSubSectionNames) return errorHandler()
				const dxItems = getDxTreeItems(fetchedMultipleSubSectionNames)
				if (!dxItems) return errorHandler()

				setLoading(false)
				setData(dxItems)
			} catch (err) {
				console.log({ err })
				errorHandler()
			}
		})()
	}, [])

	return { data, loading, error }
}

export default useSectionsTreeItemsQuery
