/* eslint-disable max-len */
/* eslint-disable import/extensions */
import { FC } from 'react'
import { TreeView } from 'devextreme-react/tree-view'
import {
	Item, ItemClickEvent, ItemSelectionChangedEvent, SelectionChangedEvent,
} from 'devextreme/ui/tree_view'
import styles from './styles/SectionsTree.module.scss'
import { SelectedSectionNamesHandler } from './hooks/useSelectedSectionNames'
import Message from '../../components/Message'
import useSectionsTreeItemsQuery from './hooks/useSectionsTreeItemsQuery'

interface Props {
	selectedSectionNamesHandler: SelectedSectionNamesHandler
}

const SectionsTree: FC<Props> = ({ selectedSectionNamesHandler }) => {
	const { loading, error, data } = useSectionsTreeItemsQuery()

	const onItemSelectionChanged = async (e: ItemSelectionChangedEvent) => {
		const itemData: Item = e.itemData
		const { node } = e
		if (itemData.items) {
			await e.component.unselectAll()
			return null
		}
		const parentText = node?.parent?.text || ''
		const text = node?.text || ''

		selectedSectionNamesHandler(parentText, text)

		return null
	}

	if (loading) return <Message message="Загрузка разделов статистики..." />
	if (error) {
		console.error('error on section tree component')
		console.error({ error })
		return <Message type="error" message="Произошла ошибка. Мы не можем получить разделы статистики с сервера." />
	}

	return (
		<div>
			<TreeView
				items={data}
				selectByClick
				showCheckBoxesMode="normal"
				selectionMode="single"
				expandEvent="click"
				onItemSelectionChanged={onItemSelectionChanged}
			/>
		</div>
	)
}

export default SectionsTree
