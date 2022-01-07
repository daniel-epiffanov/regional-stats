/* eslint-disable import/extensions */
import React, { FC, useEffect, useState } from 'react'
import VectorMap, {
	Layer,
	Tooltip,
	Border,
	Font,
	Label,
	Legend,
	Source,
	LoadingIndicator,
} from 'devextreme-react/vector-map'
import dxVectorMap, { ClickEvent as MapClickEvent } from 'devextreme/viz/vector_map'
import styles from './styles/VectorMap.module.scss'
import useVectorMapCoordsQuery from './hooks/useVectorMapCoordsQuery'
import Message from '../../components/Message'
import useComponentInstance from '../../hooks/useComponentInstance'

interface Props {
	selectedRegionHandler: (newSelectedRegion: string) => void,
	selectedRegion: string, // ***
	mainSectionName: string,
	subSectionTitle: string,
}

const BOUNDS = [71, 97, 45, 26]

const customizeText = (args: any) => {
	console.log()
	return 'yo'
}

const VectorMapRComponent: FC<Props> = (props) => {
	const {
		selectedRegionHandler, selectedRegion, mainSectionName, subSectionTitle,
	} = props

	// graphql response
	const { loading, error, data } = useVectorMapCoordsQuery()
	const coordsByRegionType = data?.coordsByRegionType || []
	const statisticsRegionNames = data?.regionNames || []

	// mapSetups
	const { instance, onInitialized } = useComponentInstance<dxVectorMap>()
	const [year, setYear] = useState<number>(2007)
	const [colorGroups, setColorGroups] = useState<number[]>([0, 5, 10])

	// useEffect(() => {
	// 	if (!mainSectionName || !subSectionTitle || !instance) return

	// 	const elements = instance.getLayers()[0].getElements()

	// 	let values: number[] = []

	// 	elements.forEach((element) => {
	// 		const name_ru = element.attribute('name_ru')
	// 		if (regionNames.includes(name_ru)) values.push(element.attribute('value'))
	// 	})

	// 	values = values.sort((a, b) => a - b)

	// 	if (values.length === 2) values.push(values[1] / 2)
	// 	if (values.length > 5) {
	// 		values = [
	// 			values[0],
	// 			Math.round(values[values.length - 1] / 2),
	// 			Math.round(values[values.length - 1] / 3),
	// 			Math.round(values[values.length - 1] / 4),
	// 			Math.round(values[values.length - 1] / 5),
	// 			values[values.length - 1],
	// 		]
	// 	}
	// 	const sortedValues = values.sort((a, b) => a - b)
	// 	setColorGroups(sortedValues)
	// }, [mainSectionName, subSectionTitle])

	async function customizeLayer(elements: any) {
		elements.map(async (element: any, i: number) => {
			const name_ru: string = element.attribute('name_ru')
			if (name_ru === selectedRegion) element.selected(true)

			if (!statisticsRegionNames.includes(name_ru)) {
				element.applySettings({
					opacity: 0.2,
				})
				return
			}

			if (!mainSectionName || !subSectionTitle) return

			// const queryOptions = {
			// 	selectedRegion: name_ru,
			// 	mainSectionName,
			// 	subSectionTitle,
			// 	startYear: year,
			// 	endYear: year,
			// }
			element.attribute('value', i * 2)
			// const statisticsByYears = await statisticsByYearsQuery(queryOptions)
			// if (!statisticsByYears) return
			// const value = parseFloat(statisticsByYears[0].value)
			// element.attribute('value', value)
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
		if (!statisticsRegionNames.includes(name_ru)) return

		selectedRegionHandler(name_ru)
	}

	// const onSelectionChanged = (e: MapClickEvent) => {
	// 	if (!e.target) return
	// 	const name_ru: string = e.target.attribute('name_ru')
	// 	selectedRegionHandler(name_ru)
	// }

	// const colorGroups = [0, 5, 10]

	// if (loading) return <Message message="Загрузка карты..." />
	// if (error) {
	// 	console.error({ error })
	// 	return <Message message="Произошла ошибка.
	// Мы не можем получить координаты для карты с сервера." type="error" />
	// }

	return (
		<div style={{ position: 'relative' }}>
			<VectorMap
				id="vectorMap"
				bounds={BOUNDS}
				onClick={onMapClick}
				// onSelectionChanged={onSelectionChanged}
				onInitialized={onInitialized}
			>
				<Layer
					dataSource={{
						type: 'FeatureCollection',
						features: coordsByRegionType,
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

				{/* <Tooltip
					enabled
					customizeTooltip={customizeTooltip}
				>
					<Border visible />
					<Font color="#fff" />
				</Tooltip> */}

				{/* <Legend customizeText={customizeText}>
					<Source layer="regions" grouping="color" />
				</Legend> */}

			</VectorMap>
		</div>
	)
}

export default VectorMapRComponent
