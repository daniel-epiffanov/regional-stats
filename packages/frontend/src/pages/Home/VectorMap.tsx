/* eslint-disable import/extensions */
import React, {
	FC, useEffect, useRef, useState,
} from 'react'
import axios from 'axios'
// import { LoadPanel } from 'devextreme-react/load-panel'
import { LoadIndicator } from 'devextreme-react/load-indicator'
import VectorMap, {
	Layer,
	Tooltip,
	Border,
	Font,
	Label,
	Legend,
	Source,
} from 'devextreme-react/vector-map'
import dxVectorMap, { ClickEvent as MapClickEvent } from 'devextreme/viz/vector_map'
import styles from './styles/VectorMap.module.scss'
// import { SelectedRegion } from '../../sharedTypes/states'
import { hostApi } from '../../helpers/host'
import { SelectionMode } from './Home'
// import statisticsByYearsQuery from '../../queries/statisticsByYears'
import useVectorMapQuery from './queryHooks/useVectorMapQuery'

// @ts-ignore
// import MapToolbar from './MapToolbar'

interface Props {
	selectedRegionHandler: (newSelectedRegion: string) => void,
	selectedRegion: string, // ***
	mainSectionName: string,
	subSectionTitle: string,
}

// type Response = GqlResponse<{
// 	multipleRegionsCoords: MultipleRegionsCoords,
// 	regionNames: RegionNames
// }>

const bounds = [71, 97, 45, 26]

// console.log({ testData })

const VectorMapRComponent: FC<Props> = (props) => {
	const {
		selectedRegionHandler, selectedRegion, mainSectionName, subSectionTitle,
	} = props

	const { loading, error, data } = useVectorMapQuery()
	const coordsByRegionType = data?.coordsByRegionType || []
	const regionNames = data?.regionNames || []

	const [year, setYear] = useState<number>(2007)
	const [colorGroups, setColorGroups] = useState<number[]>([0, 5, 10])
	const [component, setComponent] = useState<dxVectorMap>()

	const onInitialized = (e: {
		component?: dxVectorMap | undefined;
		element?: HTMLElement | undefined;
	}) => {
		if (e.component) setComponent(e.component)
	}

	useEffect(() => {
		if (!mainSectionName || !subSectionTitle || !component) return

		const elements = component.getLayers()[0].getElements()

		let values: number[] = []

		elements.forEach((element) => {
			const name_ru = element.attribute('name_ru')
			if (regionNames.includes(name_ru)) values.push(element.attribute('value'))
		})

		values = values.sort((a, b) => a - b)

		if (values.length === 2) values.push(values[1] / 2)
		if (values.length > 5) {
			values = [
				values[0],
				Math.round(values[values.length - 1] / 2),
				Math.round(values[values.length - 1] / 3),
				Math.round(values[values.length - 1] / 4),
				Math.round(values[values.length - 1] / 5),
				values[values.length - 1],
			]
		}
		const sortedValues = values.sort((a, b) => a - b)
		setColorGroups(sortedValues)
		console.log({ sortedValues })
	}, [mainSectionName, subSectionTitle])

	async function customizeLayer(elements: any) {
		elements.map(async (element: any, i: number) => {
			const name_ru: string = element.attribute('name_ru')
			if (name_ru === selectedRegion) element.selected(true)

			if (regionNames.includes(name_ru)) {
				if (!mainSectionName || !subSectionTitle) return

				const queryOptions = {
					selectedRegion: name_ru,
					mainSectionName,
					subSectionTitle,
					startYear: year,
					endYear: year,
				}
				element.attribute('value', i * 2)
				// const statisticsByYears = await statisticsByYearsQuery(queryOptions)
				// if (!statisticsByYears) return
				// const value = parseFloat(statisticsByYears[0].value)
				// element.attribute('value', value)
				// return
			}

			element.applySettings({
				opacity: 0.2,
			})
		})
	}

	function customizeTooltip(element: any) {
		return {
			text: `${element.attribute('name_ru')} ${element.attribute('value')}`,
		}
	}

	function onMapClick(e: MapClickEvent) {
		if (!e.target) return
		const name_ru = e.target.attribute('name_ru')
		if (!regionNames.includes(name_ru)) return

		e.target.selected(!e.target.selected())

		// selectedRegionHandler(name_ru)
	}

	const onSelectionChanged = (e: MapClickEvent) => {
		if (!e.target) return
		const name_ru: string = e.target.attribute('name_ru')
		selectedRegionHandler(name_ru)
	}

	// const colorGroups = [0, 5, 10]

	const customizeText = (args: any) => {
		console.log()
		return 'yo'
	}

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>

	return (
		<div style={{ position: 'relative' }}>
			{/* <VectorMap
				bounds={bounds}
				onClick={onMapClick}
				onSelectionChanged={onSelectionChanged}
				onInitialized={onInitialized}
			>
				<Layer
					dataSource={{
						type: 'FeatureCollection',
						features: multipleRegionsCoords,
					}}
					type="area"
					customize={customizeLayer}
					selectionMode="single"
					name="regions"
					colorGroupingField="value"
					colorGroups={colorGroups}
				>
					<Label enabled dataField="name_ru">
						<Font size={16} />
					</Label>
				</Layer>

				<Tooltip
					enabled
					customizeTooltip={customizeTooltip}
				>
					<Border visible />
					<Font color="#fff" />
				</Tooltip>

				<Legend customizeText={customizeText}>
					<Source layer="regions" grouping="color" />
				</Legend>

			</VectorMap> */}
		</div>
	)
}

export default VectorMapRComponent
