import { NativeEventInfo } from 'devextreme/events'
import { ValueChangedInfo } from 'devextreme/ui/editor/editor'
import { TextBoxInstance } from 'devextreme/ui/text_box'
import { dxTreeViewItem, ItemClickEvent } from 'devextreme/ui/tree_view'
import { TreeView } from 'devextreme-react/tree-view'
import { DEFAULT_SELECTED_MEASURES_MENU_KEY } from '../../../config/constants'
import useComponentInstance from '../../../hooks/useComponentInstance'
import { useSelectionsContext } from '../../context/selectionsContext'

type Props = Readonly<{
	items: dxTreeViewItem[],
	instance: TreeView['instance'] | null
}>

const useTreeViewHandlers = ({ items, instance }: Props) => {
	const {
		selectionsHandler,
		selectedMainSectionName,
	} = useSelectionsContext()

	const itemClickHandler = (e: ItemClickEvent) => {
		const isSecondLevel = e.itemData.id.split('_').length > 1

		if (!isSecondLevel) return

		e.component.unselectAll()
		e.component.selectItem(e.node?.key || DEFAULT_SELECTED_MEASURES_MENU_KEY)

		const newSelectedSubSectionName = e.node?.text
		const newSelectedMainSectionName = e.node?.parent?.text

		selectionsHandler({
			selectedSubSectionName: newSelectedSubSectionName,
			selectedMainSectionName: newSelectedMainSectionName,
		})
	}

	const onValueChangedHandler = (e: NativeEventInfo<TextBoxInstance> & ValueChangedInfo) => {
		const value = e.value
		instance?.option('searchValue', e.value)

		if (value !== '') return
		items.forEach(item => {
			if (item.text !== selectedMainSectionName) instance?.collapseItem(item.id)
		})
	}

	return {
		itemClickHandler,
		onValueChangedHandler,
	}
}

export default useTreeViewHandlers
