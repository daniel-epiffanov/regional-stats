/* eslint-disable import/extensions */
import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { TreeView } from 'devextreme-react/tree-view'
import styles from './styles/SectionsTree.module.scss'
import { GqlResponse, MainSectionNames } from '../../../../../@types/gqlResolvers'
import { hostApi } from '../../helpers/host'

interface Props {
	// selectedRegionHandler: (newSelectedRegion: string) => void,
	// selectedRegion: SelectedRegion
}

type Response = GqlResponse<{
	// multipleRegionsCoords: MultipleRegionsCoords,
	// regionNames: RegionNames
	mainSectionNames: MainSectionNames
}>

// const bounds = [71, 97, 45, 26]

const SectionsTree: FC<Props> = (props) => {
	// const {  } = props

	const [mainSectionNames, setMainSectionNames] = useState<MainSectionNames>([])

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
				${mainSectionNames.map((name, i) => `var${i}: subSectionTitles(mainSectionName:"${name}")`)}
			}`

		axios
			.post<Response>(hostApi, { query })
			.then((res) => {
				const _mainSectionNames = res.data.data.mainSectionNames
				setMainSectionNames(_mainSectionNames)
				// setMapCoords(multipleRegionsCoords)
				// setAvailableRgions(regionNames)
			})
	}, [mainSectionNames])

	const products = [{
		id: '1',
		text: 'Stores',
		expanded: true,
		items: [{
			id: '1_1',
			text: 'Super Mart of the West',
			expanded: true,
			items: [{
				id: '1_1_1',
				text: 'Video Players',
				items: [{
					id: '1_1_1_1',
					text: 'HD Video Player',
					price: 220,
					image: 'images/products/1.png',
				}, {
					id: '1_1_1_2',
					text: 'SuperHD Video Player',
					image: 'images/products/2.png',
					price: 270,
				}],
			}],
		}],
	}]

	return (
		<div>
			<TreeView
				id="simple-treeview"
				items={products}
				width={300}
			/>
		</div>
	)
}

export default SectionsTree
