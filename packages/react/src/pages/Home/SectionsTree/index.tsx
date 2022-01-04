/* eslint-disable max-len */
/* eslint-disable import/extensions */
import { FC, useState } from 'react'
import { TreeView } from 'devextreme-react/tree-view'
import {
	Item, ItemClickEvent, ItemSelectionChangedEvent, SelectionChangedEvent,
} from 'devextreme/ui/tree_view'
import { CheckBox } from 'devextreme-react'
import styles from './styles/index.module.scss'
import { SelectedSectionNamesHandler } from '../hooks/useSelectedSectionNames'
import Message from '../../../components/Message'
import useSectionsTreeQuery from './hooks/useSectionsTreeQuery'
import makeDxTreeItems from './helpers/makeDxTreeItems'
import { useSimpleQueriesContext } from '../../../context/simpleQueries'

const SectionsTree: FC = () => {
	const { mainSectionNames } = useSimpleQueriesContext()
	const { loading, error, data: sectionsTreeResponse } = useSectionsTreeQuery()
	const [selectedItemId, setSelectedItemId] = useState('20_3')

	const getDxTreeItems = () => {
		if (loading || error || !sectionsTreeResponse) return []
		return makeDxTreeItems(sectionsTreeResponse)
	}

	const onItemSelectionChanged = async (e: ItemSelectionChangedEvent) => {
		const itemData: Item = e.itemData
		console.log({ itemData })
		if (itemData.id) setSelectedItemId(`${itemData.id}`)
		// const { node } = e
		// if (itemData.items) {
		// 	await e.component.unselectAll()
		// 	return null
		// }
		// const parentText = node?.parent?.text || ''
		// const text = node?.text || ''

		// selectedSectionNamesHandler(parentText, text)

		return null
	}

	// if (loading) return <Message message="Загрузка разделов статистики..." />
	// if (error) {
	// 	console.error('error on section tree component')
	// 	console.error({ error })
	// 	return <Message type="error" message="Произошла ошибка. Мы не можем получить разделы статистики с сервера." />
	// }

	const itemRenderHandler = (item: { id: string, text: string }, index: number) => {
		console.log({ item })
		const isSubSectionName = index > mainSectionNames.length - 1
		if (isSubSectionName) return <CheckBox value={selectedItemId === item.id} text={item.text} />

		return <span>{item.text}</span>
	}

	return (
		<div>
			<TreeView
				items={getDxTreeItems()}
				selectByClick
				// showCheckBoxesMode="normal"
				selectionMode="single"
				expandEvent="click"
				searchEnabled
				itemRender={itemRenderHandler}
				onItemSelectionChanged={onItemSelectionChanged}
			/>
		</div>
	)
}

export default SectionsTree
