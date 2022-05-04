/* eslint-disable import/extensions */
import React, { FC, useEffect, useState } from 'react'
import VectorMap, {
	Layer,
	Tooltip,
	Border,
	Legend,
	Source,
	Font,
	ControlBar,
} from 'devextreme-react/vector-map'
import useCoordsQuery from './hooks/useCoordsQuery'
import Message from '../../components/Message'
import { useCurValuesContext } from '../context/curValuesContext'
import { RegionCoords } from '../../../../../sharedTypes/gqlQueries'
import _ from 'lodash'
import {
	mean as getMean,
	median as getMedian,
	standardDeviation as getStandardDeviation,
	interquartileRange as getInterquartileRange
} from 'simple-statistics'
import styles from './styles/index.module.scss'
import TopRegions from './TopRegions'

type Props = Readonly<{
	regionCoords: RegionCoords
}>

const BOUNDS = [71, 97, 45, 26]
const PALLETE = ['#eeacc5', '#db9eba', '#c88fb0', '#b581a5', '#a1739a', '#8e6490', '#7b5685']

const Map: FC<Props> = ({ regionCoords }) => {
	const {curStatData} = useCurValuesContext()

	const [colorGroups, setColorGroups] = useState<ReadonlyArray<number> | null>(
		[326.6, 52907.853489932866, 115397.40348993287, 177886.95348993287, 240376.50348993286, 302866.0534899329, 3971424.9]
		)

	useEffect(() => {
		if(!curStatData) return
		const test = Object
			.values(curStatData)
			.filter(curStatItem=> !!curStatItem)
			.map(curStatItem => {
				return curStatItem.yearValues.map(yearValue => yearValue.value)
			})
		
		const other = _.concat(...test);

		const min = Math.min(...other)
		const max = Math.max(...other)
		const interquartileRange = getInterquartileRange(other)
		const halfInterquartileRange = interquartileRange / 2
		const standardDeviation = getStandardDeviation(other)
		const cutStandardDeviation = standardDeviation / 3
		const mean = getMean(other)
		const median = getMedian(other)

		const newColorSetting = [
			min,
			(median - min) / 2,
			(median - min) / 3,
			(median - min) / 4,
			(median - min) / 5,
			(median - min) / 6,
			median,
			(max - median) / 6,
			(max - median) / 5,
			(max - median) / 4,
			(max - median) / 3,
			(max - median) / 2,
			max,
		]

		setColorGroups(newColorSetting)
		console.log({newColorSetting})

		// debugger
	}, [curStatData])
	


	function customizeLayer(elements: any) {
		// debugger
		if(!curStatData) return
		elements.forEach((element: any) => {
			const regionName = element.attribute('name_ru')
			element.attribute('value', curStatData[regionName].yearValues[0].value)
			// if (!isRegionNameInStatistics(regionName)) {
			// 	element.applySettings({ opacity: 0.2 })
			// }
		})
	}

	// function onMapClick(e: MapClickEvent) {
	// 	if (!e.target) return
	// 	const regionName = e.target.attribute('name_ru')
	// 	const value = e.target.attribute('value')
	// 	// console.log({ value })
	// 	// if (!isRegionNameInStatistics(regionName)) return

	// 	// selectionsHandler({ selectedRegionName: regionName })
	// }

	function customizeTooltip(element: any, b: any, c: any) {
		return {
			text: `${element.attribute('name_ru')} ${element.attribute('value')}`,
		}
	}

	// const customizeText = (args: { end: number, start: number, index: number }) => {
	// 	const { end, start, index } = args
	// 	// const formattedStart = bigNumberFormatter(start)
	// 	// const formattedEnd = bigNumberFormatter(end)
	// 	// const percent = ((index * 2) / 10) * 100
	// 	// const isLowestGroup = percent === 0
	// 	// const isHighestGroup = percent === 100
	// 	// if (isLowestGroup) return `<b>low</b> (${formattedStart} - ${formattedEnd})`
	// 	// if (isHighestGroup) return `<b>high</b> (${formattedStart} - ${formattedEnd})`

	// 	return `${percent}%`
	// }

	// const colorGroups = [0, 50, 200, 1000, 5000, 300000, 1000000];

	return (
		<div className={styles['root']}>
			<VectorMap
				id="vectorMap"
				// bounds={BOUNDS}
				// onClick={onMapClick}
				// onInitialized={onInitializedHandler}
				zoomFactor={3}
				// height="90vh"
			>
				<ControlBar enabled={false}/>
				<Layer
					dataSource={{
						type: 'FeatureCollection',
						features: regionCoords,
					}}
					type="area"
					customize={customizeLayer}
					selectionMode="single"
					name="regions"
					// palette="Violet"
					colorGroupingField="value"
					colorGroups={colorGroups}
					label={{
						enabled: true,
						dataField: 'name_ru',
						font: {
							size: 10,
						},
					}}

				// borderWidth="2px"
				/>

				<Tooltip
					enabled
					customizeTooltip={customizeTooltip}
				>
					<Border visible />
					<Font color="#fff" />
				</Tooltip>

				<Legend>
					<Source layer="regions" grouping="color" />
				</Legend>
			</VectorMap>

			<TopRegions />
		</div>
	)
}

const MapPreloads: FC = () => {
	// graphql response
	const { loading, error, data } = useCoordsQuery()

	if (loading) return <Message type="message" text="Map data is loading." positionId="vector-map-container" />

	const coordsByRegionType = data?.regionCoords

	// debugger

	if (error || !data || !coordsByRegionType) return <Message type="error" text="Error while loading the map data." />

	return <Map regionCoords={coordsByRegionType} />
}

// const MapPreloads = () => {

// }

export default MapPreloads
