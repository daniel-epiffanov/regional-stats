import { Item } from 'devextreme/ui/tree_view'
import { StatisticsSectionsTree } from '../../../../../../sharedTypes/gqlQueries'
import { DEFAULT_EXPANDED_MEASURES_MENU_KEY, DEFAULT_SELECTED_MEASURES_MENU_KEY } from '../../../config/constants'

type GenerateItem = (id: string, text: string, childItems?: ReadonlyArray<string>) => Item

const getTreeViewItems = (
	sectionsTree: StatisticsSectionsTree | null,
) => {
	if (!sectionsTree) return []
	const statisticsMainSectionNames = Object.keys(sectionsTree)

	const generateItem: GenerateItem = (id, text, childItems) => ({
		id,
		text,
		items: childItems && childItems.map((item, _id) => generateItem(`${id}_${_id}`, item)),
		isExpanded: id === DEFAULT_EXPANDED_MEASURES_MENU_KEY || false,
		isSelected: id === DEFAULT_SELECTED_MEASURES_MENU_KEY || false,
	})

	return statisticsMainSectionNames
		.map((mainSectionName, i) => generateItem(`${i}`, mainSectionName, sectionsTree[mainSectionName]))
}

export default getTreeViewItems
