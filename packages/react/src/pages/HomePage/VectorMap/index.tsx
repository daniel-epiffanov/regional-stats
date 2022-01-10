/* eslint-disable import/extensions */
import React, { FC, useEffect, useState } from 'react'
import VectorMap, {
	Layer,
	Tooltip,
	Border,
	Legend,
	Source,
	Font,
} from 'devextreme-react/vector-map'
import dxVectorMap, { ClickEvent as MapClickEvent } from 'devextreme/viz/vector_map'
import { EventInfo } from 'devextreme/events'
import styles from './styles/index.module.scss'
import useVectorMapCoordsQuery from './hooks/useVectorMapCoordsQuery'
import Message from '../../../components/Message'
import useComponentInstance from '../../../hooks/useComponentInstance'
import { useSimpleQueriesContext } from '../../../context/simpleQueriesContext'
import { useSelectionsContext } from '../context/selectionsContext'
import { CoordsByRegionTypeResponse } from '../../../../../../sharedTypes/gqlQueries'
import statisticsDataForManyRegionsQuery from './customQueries/statisticsDataForManyRegionsQuery'
import makeColorGroupsRange from './devExtreme/makeColorGroupsRange'
import bigNumberFormatter from '../../../helpers/bigNumberFormatter'

type Props = Readonly<{
	coordsByRegionType: CoordsByRegionTypeResponse
}>

const BOUNDS = [71, 97, 45, 26]
const PALLETE = ['#eeacc5', '#db9eba', '#c88fb0', '#b581a5', '#a1739a', '#8e6490', '#7b5685']

const VectorMapComponent: FC<Props> = ({ coordsByRegionType }) => {
	const {
		selectedRegionName,
		selectionsHandler,
		selectedMainSectionName,
		selectedSubSectionName,
		selectedYearOnMap,
	} = useSelectionsContext()
	const { statisticsRegionNames } = useSimpleQueriesContext()
	const isRegionNameInStatistics = (regionName: string) => statisticsRegionNames.includes(regionName)

	const getRegionNamesOnMapAndStatistics = () => {
		const regionNamesOnMap = coordsByRegionType
			.map(coordsByRegionTypeItem => coordsByRegionTypeItem.properties.name_ru)

		return regionNamesOnMap
			.filter(regionNameOnMap => statisticsRegionNames.includes(regionNameOnMap))
	}

	// mapSetups
	const { instance, onInitialized } = useComponentInstance<dxVectorMap>()
	const [colorGroups, setColorGroups] = useState<number[]>([2330427, 4330427, 20208917])

	useEffect(() => {
		(async () => {
			const isFetchingDataMakesSense = !!selectedMainSectionName
				&& !!selectedSubSectionName
				&& !!selectedYearOnMap

			if (!isFetchingDataMakesSense) return
			const statisticsData = await statisticsDataForManyRegionsQuery({
				regionNames: getRegionNamesOnMapAndStatistics(),
				mainSectionName: selectedMainSectionName,
				subSectionName: selectedSubSectionName,
				year: selectedYearOnMap,
			})
			if (!statisticsData) return
			console.log('cl')
			console.log({ statisticsData })

			// // debugger

			const statisticsDataValues = Object.values(statisticsData).map(statisticsDataItem => {
				const value = parseFloat(statisticsDataItem[0].value)
				return value
			})
			const newColorGroups = makeColorGroupsRange(statisticsDataValues)
			setColorGroups(newColorGroups)
			console.log({ newColorGroups })

			const elements = instance?.getLayerByName('regions')?.getElements()
			elements && elements.forEach((element) => {
				const regionName = element.attribute('name_ru')

				if (isRegionNameInStatistics(regionName) && statisticsData) {
					// element.attribute('value', Math.floor(Math.random() * 10))
					const statisticsValue = parseFloat(statisticsData[regionName][0].value)
					element.attribute('value', statisticsValue)
					element.applySettings({ setColorGroups: newColorGroups })
				}
			})
		})()
	}, [instance, selectedMainSectionName, selectedSubSectionName,
		selectedMainSectionName, selectedRegionName])

	function customizeLayer(elements: any) {
		elements.forEach((element: any) => {
			const regionName = element.attribute('name_ru')
			if (!isRegionNameInStatistics(regionName)) {
				element.applySettings({ opacity: 0.2 })
			}
		})
	}

	function onMapClick(e: MapClickEvent) {
		if (!e.target) return
		const regionName = e.target.attribute('name_ru')
		const value = e.target.attribute('value')
		// console.log({ value })
		if (!isRegionNameInStatistics(regionName)) return

		selectionsHandler({ selectedRegionName: regionName })
	}

	function customizeTooltip(element: any, b: any, c: any) {
		return {
			text: `${element.attribute('name_ru')} ${bigNumberFormatter(element.attribute('value'))}`,
		}
	}

	const customizeText = (args: { end: number, start: number, index: number }) => {
		const { end, start, index } = args
		const formattedStart = bigNumberFormatter(start)
		const formattedEnd = bigNumberFormatter(end)
		const percent = ((index * 2) / 10) * 100
		const isLowestGroup = percent === 0
		const isHighestGroup = percent === 100
		if (isLowestGroup) return `<b>low</b> (${formattedStart} - ${formattedEnd})`
		if (isHighestGroup) return `<b>high</b> (${formattedStart} - ${formattedEnd})`

		return `${percent}% (${formattedStart} - ${formattedEnd})`
	}

	return (
		<div style={{ position: 'relative' }}>
			<VectorMap
				id="vectorMap"
				bounds={BOUNDS}
				onClick={onMapClick}
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
					palette="Violet"
					colorGroupingField="value"
					colorGroups={colorGroups}
					label={{
						enabled: true,
						dataField: 'name_ru',
						font: {
							size: 10,
						},
					}}
				/>

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
				<div>
					<h1>hey</h1>
				</div>

			</VectorMap>
		</div>
	)
}

const VectorMapDataLoader: FC = () => {
	// graphql response
	const { loading, error, data } = useVectorMapCoordsQuery()
	const coordsByRegionType = data?.coordsByRegionType

	if (loading) return <Message type="message" text="Map data is loading." />
	if (error) return <Message type="error" text="Error while loading the map data." />

	if (coordsByRegionType) return <VectorMapComponent coordsByRegionType={coordsByRegionType} />
	return <Message type="error" text="Error coordsByRegionType is not recieved." />
}

export default VectorMapDataLoader
