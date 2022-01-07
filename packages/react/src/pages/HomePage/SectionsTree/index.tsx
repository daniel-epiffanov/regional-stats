import { FC, useState } from 'react'
import { TreeView } from 'devextreme-react/tree-view'
import { Item, ItemSelectionChangedEvent } from 'devextreme/ui/tree_view'
import { CheckBox } from 'devextreme-react'
import styles from './styles/index.module.scss'
import Message from '../../../components/Message'
import useSectionsTreeQuery from './hooks/useSectionsTreeQuery'
import makeDxTreeItems from './helpers/makeDxTreeItems'
import { useSelectionParamsContext } from '../context/selectionParamsContext'

const SectionsTree: FC = () => {
	const { loading, error, data: sectionsTreeResponse } = useSectionsTreeQuery()
	const { selectionParamsHandler } = useSelectionParamsContext()
	const [selectedItemId, setSelectedItemId] = useState('20_3')

	const getDxTreeItems = () => {
		if (loading || error || !sectionsTreeResponse) return []
		return makeDxTreeItems(sectionsTreeResponse, selectedItemId)
	}

	// if (loading) return <Message message="Загрузка разделов статистики..." />
	// if (error) {
	// 	console.error('error on section tree component')
	// 	console.error({ error })
	// 	return <Message type="error" message="Произошла ошибка.
	// Мы не можем получить разделы статистики с сервера." />
	// }

	const itemRenderHandler = (item: { id: string, text: string }, index: number) => {
		const isSubSectionName = item.id.split('_').length > 1
		if (isSubSectionName) return <CheckBox value={selectedItemId === item.id} text={item.text} />

		return <span>{item.text}</span>
	}

	const onItemClickHandler = (e: ItemSelectionChangedEvent) => {
		const isSecondLevel = e.itemData.id.split('_').length > 1
		if (isSecondLevel) {
			setSelectedItemId(`${e.itemData.id}`)
			selectionParamsHandler({
				selectedSubSectionName: e.node?.text,
				selectedMainSectionName: e.node?.parent?.text,
			})
		}
	}

	return (
		<div>
			<TreeView
				items={getDxTreeItems()}
				// selectionMode="single"
				expandEvent="click"
				searchEnabled
				itemRender={itemRenderHandler}
				onItemClick={onItemClickHandler}
			/>
		</div>
	)
}

export default SectionsTree
