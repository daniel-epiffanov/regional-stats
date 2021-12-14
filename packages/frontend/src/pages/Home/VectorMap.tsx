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
import useVectorMapQuery from './hooks/useVectorMapQuery'
import Error from '../../components/Error'

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
	const { loading, error, data } = useVectorMapQuery()
	const coordsByRegionType = data?.coordsByRegionType || []
	const regionNames = data?.regionNames || []

	// mapSetups
	// const [component, setComponent] = useState<dxVectorMap>()
	const [year, setYear] = useState<number>(2007)
	const [colorGroups, setColorGroups] = useState<number[]>([0, 5, 10])
	useComponentInstance

	// const onInitialized = (e: {
	// 	component?: dxVectorMap | undefined;
	// 	element?: HTMLElement | undefined;
	// }) => {
	// 	if (e.component) setComponent(e.component)
	// }

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

	// if (loading) return <p>Loading...</p>
	if (error) {
		console.error({ error })
		return <Error message="Произошла ошибка. Мы не можем получить координаты для карты с сервера." />
	}

	return (
		<div style={{ position: 'relative' }}>
			{loading && <p>loading</p>}
			<VectorMap
				id="vectorMap"
				bounds={BOUNDS}
				// onClick={onMapClick}
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
