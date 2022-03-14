import { FC, useCallback, useState } from 'react'
import { TreeView } from 'devextreme-react/tree-view'
import { ItemClickEvent } from 'devextreme/ui/tree_view'
import styles from './styles/index.module.scss'
import Message from '../../components/Message'
import useSectionsTreeQuery from './queries/useStatisticsSectionsTreeQuery'
import getItems from './devExtreme/getItems'
import { useSelectionsContext } from '../context/selectionsContext'
import { StatisticsSectionsTree } from '../../../../../sharedTypes/gqlQueries'
import { DEFAULT_SELECTED_MEASURES_MENU_KEY } from '../../config/constants'

type Props = Readonly<{
	statisticsSectionTree: StatisticsSectionsTree
}>

const MenuSectionsTree: FC<Props> = ({ statisticsSectionTree }) => {
	const {
		selectionsHandler,
		selectedMainSectionName,
		selectedSubSectionName,
	} = useSelectionsContext()

	const [items] = useState(getItems(statisticsSectionTree))

	const itemClickHandler = (e: ItemClickEvent) => {
		const isSecondLevel = e.itemData.id.split('_').length > 1

		if (!isSecondLevel) return

		const newSelectedSubSectionName = e.node?.text
		const newSelectedMainSectionName = e.node?.parent?.text

		e.component.unselectAll()
		e.component.selectItem(e.node?.key || DEFAULT_SELECTED_MEASURES_MENU_KEY)

		selectionsHandler({
			selectedSubSectionName: newSelectedSubSectionName,
			selectedMainSectionName: newSelectedMainSectionName,
		})
	}

	return (
		<div>
			<TreeView
				items={items}
				expandEvent="click"
				searchEnabled
				searchTimeout={200}
				onItemClick={itemClickHandler}
				expandedExpr="isExpanded"
				selectedExpr="isSelected"
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
