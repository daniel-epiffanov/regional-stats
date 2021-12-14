/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { TreeView } from 'devextreme-react/tree-view'
import {
	Item, ItemClickEvent, ItemSelectionChangedEvent, SelectionChangedEvent,
} from 'devextreme/ui/tree_view'
import styles from './styles/SectionsTree.module.scss'
// import { MainSectionNamesQuery } from '../../../../../sharedTypes/gqlResolvers'
import { hostApi } from '../../helpers/host'
import useSectionsTreeQuery from './hooks/useSectionsTreeQuery'

interface Props {
	// selectedRegionHandler: (newSelectedRegion: string) => void,
	// selectedRegion: SelectedRegion
	selectedSectionsHandler: (
		_selectedMainSectionName: string,
		_selectedSubSectionTitle: string,) => void
}

// type Response = GqlResponse<{
// 	mainSectionNames: MainSectionNames
// }>
// type SubSectionsResponse = GqlResponse<{
// 	[key: string]: string[]
// }>

// const bounds = [71, 97, 45, 26]

const SectionsTree: FC<Props> = (props) => {
	const { selectedSectionsHandler } = props

	const { loading, error, data } = useSectionsTreeQuery()

	useEffect(() => {
		console.log({ loading })
		console.log({ error })
		console.log({ data })
	}, [data, loading, error])

	// const [mainSectionNames, setMainSectionNames] = useState<MainSectionNames>([])
	// const [items, setItems] = useState<Item[]>([])

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

	// return <p>yo</p>
	return (
		<div>
			<TreeView
				items={data}
				selectByClick
				showCheckBoxesMode="normal"
				selectionMode="single"
				expandEvent="click"
				onItemSelectionChanged={onItemSelectionChanged}
			/>
		</div>
	)
}

export default SectionsTree
