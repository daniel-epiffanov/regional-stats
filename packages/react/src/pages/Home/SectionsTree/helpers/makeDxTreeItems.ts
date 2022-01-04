import { Item } from 'devextreme/ui/tree_view'
import { SectionsTreeResponse } from '../../../../../../../sharedTypes/gqlQueries'

type GenerateItem = (id: string, text: string, childItems?: ReadonlyArray<string>) => Item

const makeDxTreeItems = (sectionsTree: SectionsTreeResponse) => {
	if (!sectionsTree) return []
	const mainSectionNames = Object.keys(sectionsTree)

	const generateItem: GenerateItem = (id, text, childItems) => ({
		id,
		text,
		items: childItems && childItems.map((item, _id) => generateItem(`${id}_${_id}`, item)),
	})

	return mainSectionNames
		.map((mainSectionName, i) => generateItem(`${i}`, mainSectionName, sectionsTree[mainSectionName]))
}

export default makeDxTreeItems
