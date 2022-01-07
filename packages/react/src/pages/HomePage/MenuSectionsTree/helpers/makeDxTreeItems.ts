import { Item } from 'devextreme/ui/tree_view'
import { SectionsTreeResponse } from '../../../../../../../sharedTypes/gqlQueries'

type GenerateItem = (id: string, text: string, childItems?: ReadonlyArray<string>) => Item

const makeDxTreeItems = (sectionsTree: SectionsTreeResponse | null, selectedItemId: string) => {
	if (!sectionsTree) return []
	const mainSectionNames = Object.keys(sectionsTree)

	const generateItem: GenerateItem = (id, text, childItems) => ({
		id,
		text,
		items: childItems && childItems.map((item, _id) => generateItem(`${id}_${_id}`, item)),
		// isExpanded: true,
		expanded: id === selectedItemId || false,
	})

	return mainSectionNames
		.map((mainSectionName, i) => generateItem(`${i}`, mainSectionName, sectionsTree[mainSectionName]))
}

export default makeDxTreeItems
