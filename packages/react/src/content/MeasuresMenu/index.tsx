import { FC, useState } from 'react'
import { TreeView } from 'devextreme-react/tree-view'
import { ItemClickEvent } from 'devextreme/ui/tree_view'
import { CheckBox } from 'devextreme-react'
import styles from './styles/index.module.scss'
import Message from '../../components/Message'
import useSectionsTreeQuery from './queries/useStatisticsSectionsTreeQuery'
import getDxTreeViewItems from './devExtreme/getDxTreeViewItems'
import { useSelectionsContext } from '../context/selectionsContext'
import { StatisticsSectionsTree } from '../../../../../sharedTypes/gqlQueries'

type Props = Readonly<{
	statisticsSectionTree: StatisticsSectionsTree
}>

const MenuSectionsTree: FC<Props> = ({ statisticsSectionTree }) => {
	const { selectionsHandler } = useSelectionsContext()
	const [selectedItemId, setSelectedItemId] = useState('20_3')

	const dxTreeViewItems = getDxTreeViewItems(statisticsSectionTree, selectedItemId)

	// const itemRenderHandler = (item: { id: string, text: string }, index: number) => {
	// 	const isSubSectionName = item.id.split('_').length > 1
	// 	if (isSubSectionName) {
	// 		return (
	// 			<div className={styles.checkboxContainer}>
	// 				<CheckBox value={selectedItemId === item.id} />
	// 				<div>
	// 					{item.text}
	// 				</div>
	// 			</div>
	// 		)
	// 	}

	// 	return <span>{item.text}</span>
	// }

	// const itemClickHandler = (e: ItemClickEvent) => {
	// 	const isSecondLevel = e.itemData.id.split('_').length > 1
	// 	if (isSecondLevel) {
	// 		setSelectedItemId(`${e.itemData.id}`)
	// 		selectionsHandler({
	// 			selectedSubSectionName: e.node?.text,
	// 			selectedMainSectionName: e.node?.parent?.text,
	// 		})
	// 	}
	// }

	return (
		<div>
			<TreeView
				items={dxTreeViewItems}
				expandEvent="click"
				searchEnabled
			// itemRender={itemRenderHandler}
			// onItemClick={itemClickHandler}
			// expandedExpr="isExpanded"
			/>
		</div>
	)
}

const MenuSectionsTreePreloads: FC = () => {
	const { loading, error, data } = useSectionsTreeQuery()

	if (loading) return <Message type="message" text="Loading menu sections." positionId="measures-menu-container" />
	if (error || !data) return <Message type="error" text="We have not fetched the menu sections." />

	return <MenuSectionsTree statisticsSectionTree={data} />
}

export default MenuSectionsTreePreloads
