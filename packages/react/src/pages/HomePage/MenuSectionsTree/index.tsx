import { FC, useState } from 'react'
import { TreeView } from 'devextreme-react/tree-view'
import { ItemClickEvent } from 'devextreme/ui/tree_view'
import { CheckBox } from 'devextreme-react'
import styles from './styles/index.module.scss'
import Message from '../../../components/Message'
import useSectionsTreeQuery from './hooks/useSectionsTreeQuery'
import makeDxItems from './devExtreme/makeDxItems'
import { useSelectionsContext } from '../context/selectionsContext'

const MenuSectionsTree: FC = () => {
	const { loading, error, data: sectionsTreeResponse } = useSectionsTreeQuery()
	const { selectionsHandler } = useSelectionsContext()
	const [selectedItemId, setSelectedItemId] = useState('20_3')

	const getDxItems = () => {
		if (loading || error || !sectionsTreeResponse) return []
		return makeDxItems(sectionsTreeResponse, selectedItemId)
	}

	if (loading) return <Message type="message" text="Loading menu sections." />
	if (error) return <Message type="error" text="We have not fetched the menu sections." />

	const itemRenderHandler = (item: { id: string, text: string }, index: number) => {
		const isSubSectionName = item.id.split('_').length > 1
		if (isSubSectionName) return <CheckBox value={selectedItemId === item.id} text={item.text} />

		return <span>{item.text}</span>
	}

	const onItemClickHandler = (e: ItemClickEvent) => {
		const isSecondLevel = e.itemData.id.split('_').length > 1
		if (isSecondLevel) {
			setSelectedItemId(`${e.itemData.id}`)
			selectionsHandler({
				selectedSubSectionName: e.node?.text,
				selectedMainSectionName: e.node?.parent?.text,
			})
		}
	}

	return (
		<div>
			<TreeView
				items={getDxItems()}
				// selectionMode="single"
				expandEvent="click"
				searchEnabled
				itemRender={itemRenderHandler}
				onItemClick={onItemClickHandler}
				expandedExpr="isExpanded"
			/>
		</div>
	)
}

export default MenuSectionsTree
