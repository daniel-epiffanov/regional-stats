/* eslint-disable import/extensions */
import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { TreeView } from 'devextreme-react/tree-view'
import {
	Item, ItemClickEvent, ItemSelectionChangedEvent, SelectionChangedEvent,
} from 'devextreme/ui/tree_view'
import styles from './styles/SectionsTree.module.scss'
import { GqlResponse, MainSectionNames } from '../../../../../@types/gqlResolvers'
import { hostApi } from '../../helpers/host'

interface Props {
	// selectedRegionHandler: (newSelectedRegion: string) => void,
	// selectedRegion: SelectedRegion
	selectedSectionsHandler: (
		_selectedMainSectionName: string,
		_selectedSubSectionTitle: string,) => void
}

type Response = GqlResponse<{
	mainSectionNames: MainSectionNames
}>
type SubSectionsResponse = GqlResponse<{
	[key: string]: string[]
}>

// const bounds = [71, 97, 45, 26]

const SectionsTree: FC<Props> = (props) => {
	const { selectedSectionsHandler } = props

	const [mainSectionNames, setMainSectionNames] = useState<MainSectionNames>([])
	const [items, setItems] = useState<Item[]>([])

	useEffect(() => {
		const query = `
			query {
				mainSectionNames,
			}`

		axios
			.post<Response>(hostApi, { query })
			.then((res) => {
				const _mainSectionNames = res.data.data.mainSectionNames
				setMainSectionNames(_mainSectionNames)
				// setMapCoords(multipleRegionsCoords)
				// setAvailableRgions(regionNames)
			})
	}, [])

	useEffect(() => {
		if (!mainSectionNames.length) return

		const query = `
			query {
				${mainSectionNames.map((name, i) => `var_${i}: subSectionTitles(mainSectionName:"${name}")`)}
			}`

		axios
			.post<SubSectionsResponse>(hostApi, { query })
			.then((res) => {
				const _data = res.data.data
				console.log({ _data })
				const entries = Object.entries(_data)

				type GenerateItem = (id: string, text: string, childItems?: string[]) => Item

				const generateItem: GenerateItem = (id, text, childItems) => ({
					id,
					text,
					items: childItems && childItems.map((item, _id) => generateItem(`${id}_${_id}`, item)),
				})

				const _items = mainSectionNames.map((mainSectionName, i) => generateItem(`${i}`, mainSectionName, _data[`var_${i}`]))

				// console.log({ _items })
				setItems(_items)

				// setMainSectionNames(_mainSectionNames)
				// setMapCoords(multipleRegionsCoords)
				// setAvailableRgions(regionNames)
			})
	}, [mainSectionNames])

	const onItemClick = async (e: ItemClickEvent) => {
		const itemData: Item = e.itemData
		const { node } = e
		console.log(itemData)
		console.log({ e })
		// debugger
		if (itemData.items) {
			e.event?.preventDefault()
			// e.component.selectItem(itemData.items[0])
			return null
		}

		await e.component.unselectAll()

		const parentText = node?.parent?.text || ''
		const text = node?.text || ''

		selectedSectionsHandler(parentText, text)

		return null
	}

	const onItemSelectionChanged = async (e: ItemSelectionChangedEvent) => {
		// console.log({ e })
		const itemData: Item = e.itemData
		const { node } = e
		// console.log(itemData)
		// console.log({ e })
		// // debugger
		if (itemData.items) {
			// debugger
			await e.component.unselectAll()
			// @ts-ignore
			// e.event?.preventDefault()
			// e.component.selectItem(itemData.items[0])
			return null
		}

		// await e.component.unselectAll()

		const parentText = node?.parent?.text || ''
		const text = node?.text || ''

		selectedSectionsHandler(parentText, text)

		return null
	}

	// const onSelectionChanged = (e: SelectionChangedEvent) => {
	// 	console.log({ e })
	// }

	return (
		<div>
			<TreeView
				// id="simple-treeview"
				items={items}
				// width={300}
				// searchEnabled
				selectByClick
				showCheckBoxesMode="normal"
				selectionMode="single"
				expandEvent="click"
				onItemSelectionChanged={onItemSelectionChanged}
			// onSelectionChanged={onSelectionChanged}
			/>
		</div>
	)
}

export default SectionsTree
