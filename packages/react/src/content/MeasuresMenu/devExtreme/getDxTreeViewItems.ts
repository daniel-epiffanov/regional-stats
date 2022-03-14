import { Item } from 'devextreme/ui/tree_view'
import { StatisticsSectionsTree } from '../../../../../../sharedTypes/gqlQueries'

type GenerateItem = (id: string, text: string, childItems?: ReadonlyArray<string>) => Item

const getDxTreeViewItems = (
	sectionsTree: StatisticsSectionsTree | null,
	selectedItemId: string,
) => {
	if (!sectionsTree) return []
	const statisticsMainSectionNames = Object.keys(sectionsTree)

	const generateItem: GenerateItem = (id, text, childItems) => ({
		id,
		text,
		items: childItems && childItems.map((item, _id) => generateItem(`${id}_${_id}`, item)),
		isExpanded: id === selectedItemId || false,
	})

	return statisticsMainSectionNames
		.map((mainSectionName, i) => generateItem(`${i}`, mainSectionName, sectionsTree[mainSectionName]))
}

export default getDxTreeViewItems
