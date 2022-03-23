import {
	FC, useCallback, useEffect, useRef, useState,
} from 'react'
import { TreeView } from 'devextreme-react/tree-view'
import { ItemClickEvent } from 'devextreme/ui/tree_view'
import { EditorOptions, ValueChangedInfo } from 'devextreme/ui/editor/editor'
import { TextBoxInstance } from 'devextreme/ui/text_box'
import { NativeEventInfo } from 'devextreme/events'
import styles from './styles/index.module.scss'
import Message from '../../components/Message'
import useSectionsTreeQuery from './queries/useStatisticsSectionsTreeQuery'
import getTreeViewItems from './devExtreme/getTreeViewItems'
import { useSelectionsContext } from '../context/selectionsContext'
import { StatisticsSectionsTree } from '../../../../../sharedTypes/gqlQueries'
import { DEFAULT_SELECTED_MEASURES_MENU_KEY } from '../../config/constants'
import useComponentInstance from '../../hooks/useComponentInstance'
import useTreeViewHandlers from './hooks/useTreeViewHandlers'

type Props = Readonly<{
	statisticsSectionTree: StatisticsSectionsTree
}>

const MeasuresMenu: FC<Props> = ({ statisticsSectionTree }) => {
	const [instance, onInitializedHandler] = useComponentInstance<TreeView['instance']>()

	const [items] = useState(getTreeViewItems(statisticsSectionTree))

	const { itemClickHandler, onValueChangedHandler } = useTreeViewHandlers({ items, instance })

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
				onInitialized={onInitializedHandler}
				searchEditorOptions={{
					onValueChanged: onValueChangedHandler,
				}}
			/>
		</div>
	)
}

const MeasuresMenuPreloads: FC = () => {
	const { loading, error, data } = useSectionsTreeQuery()

	if (loading) return <Message type="message" text="Loading menu sections." positionId="measures-menu-container" />
	if (error || !data) return <Message type="error" text="We have not fetched the menu sections." />

	return <MeasuresMenu statisticsSectionTree={data} />
}

export default MeasuresMenuPreloads
