import { FC } from 'react'
import { TreeView } from 'devextreme-react/tree-view'
import { ItemClickEvent } from 'devextreme/ui/tree_view'
import styles from './styles/index.module.scss'
import Message from '../../components/Message'
import useSectionsTreeQuery from './queries/useStatisticsSectionsTreeQuery'
import getItems from './devExtreme/getItems'
import { useSelectionsContext } from '../context/selectionsContext'
import { StatisticsSectionsTree } from '../../../../../sharedTypes/gqlQueries'

type Props = Readonly<{
	statisticsSectionTree: StatisticsSectionsTree
}>

const MenuSectionsTree: FC<Props> = ({ statisticsSectionTree }) => {
	const {
		selectionsHandler,
		selectedMainSectionName,
		selectedSubSectionName,
	} = useSelectionsContext()

	const items = getItems(statisticsSectionTree, selectedMainSectionName, selectedSubSectionName)

	const itemClickHandler = (e: ItemClickEvent) => {
		const isSecondLevel = e.itemData.id.split('_').length > 1

		if (!isSecondLevel) return

		selectionsHandler({
			selectedSubSectionName: e.node?.text,
			selectedMainSectionName: e.node?.parent?.text,
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
