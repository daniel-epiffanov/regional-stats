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
import useCoordsQuery from './hooks/useCoordsQuery'
import Message from '../../components/Message'
import { useCurValuesContext } from '../context/curValuesContext'
import { RegionCoords } from '../../../../../sharedTypes/gqlQueries'
import _ from 'lodash'
import {mean as getMean, standardDeviation as getStandardDeviation} from 'simple-statistics'

type Props = Readonly<{
	regionCoords: RegionCoords
}>

const BOUNDS = [71, 97, 45, 26]
const PALLETE = ['#eeacc5', '#db9eba', '#c88fb0', '#b581a5', '#a1739a', '#8e6490', '#7b5685']

const Map: FC<Props> = ({ regionCoords }) => {
	const {curStatData} = useCurValuesContext()

	const [colorGroups, setColorGroups] = useState<ReadonlyArray<number> | null>([3971424.9, -217936.46432840865, 177886.95348993287, 573710.3713082743, 326.6])

	useEffect(() => {
		if(!curStatData) return
		const test = Object
			.values(curStatData)
			.filter(curStatItem=> !!curStatItem)
			.map(curStatItem => {
				return curStatItem.yearValues.map(yearValue => yearValue.value)
			})
		
		const other = _.concat(...test);

		const standardDeviation = getStandardDeviation(other)
		const cutStandardDeviation = standardDeviation / 3
		const mean = getMean(other)

		const newColorSetting = [
			Math.min(...other),
			mean - cutStandardDeviation,
			mean,
			mean + cutStandardDeviation,
			Math.max(...other),
		]

		setColorGroups(newColorSetting)

		debugger
	}, [curStatData])
	

	// const { statRegionNames: statisticsRegionNames } = useGeneralDataContext()
	// const isRegionNameInStatistics = (regionName: string) => statisticsRegionNames.includes(regionName)

	// const getRegionNamesOnMapAndStatistics = () => {
	// 	const regionNamesOnMap = coordsByRegionType
	// 		.map(coordsByRegionTypeItem => coordsByRegionTypeItem.properties.name_ru)

	// 	return regionNamesOnMap
	// 		.filter(regionNameOnMap => statisticsRegionNames.includes(regionNameOnMap))
	// }

	// mapSetups
	// const [instance, onInitializedHandler] = useComponentInstance<dxVectorMap>()
	// const [colorGroups, setColorGroups] = useState<number[]>([2330427, 4330427, 20208917])

	// useEffect(() => {
	// 	(async () => {
	// 		const isFetchingDataMakesSense = !!selectedMainSectionName
	// 			&& !!selectedSubSectionName
	// 			&& !!selectedYearOnMap

	// 		if (!isFetchingDataMakesSense) return
	// 		const statisticsData = await statisticsDataForManyRegionsQuery({
	// 			regionNames: getRegionNamesOnMapAndStatistics(),
	// 			mainSectionName: selectedMainSectionName,
	// 			subSectionName: selectedSubSectionName,
	// 			year: selectedYearOnMap,
	// 		})
	// 		if (!statisticsData) return
	// 		console.log('cl')
	// 		console.log({ statisticsData })

	// 		// // debugger

	// 		const statisticsDataValues = Object.values(statisticsData).map(statisticsDataItem => {
	// 			const value = parseFloat(statisticsDataItem[0].value)
	// 			return value
	// 		})
	// 		const newColorGroups = makeColorGroupsRange(statisticsDataValues)
	// 		setColorGroups(newColorGroups)
	// 		console.log({ newColorGroups })

	// 		const elements = instance?.getLayerByName('regions')?.getElements()
	// 		elements && elements.forEach((element) => {
	// 			const regionName = element.attribute('name_ru')

	// 			if (isRegionNameInStatistics(regionName) && statisticsData) {
	// 				// element.attribute('value', Math.floor(Math.random() * 10))
	// 				const statisticsValue = parseFloat(statisticsData[regionName][0].value)
	// 				element.attribute('value', statisticsValue)
	// 				element.applySettings({ setColorGroups: newColorGroups })
	// 			}
	// 		})
	// 	})()
	// }, [instance, selectedMainSectionName, selectedSubSectionName,
	// 	selectedMainSectionName, selectedRegionName])

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
	// 	if (!isRegionNameInStatistics(regionName)) return

	// 	selectionsHandler({ selectedRegionName: regionName })
	// }

	// function customizeTooltip(element: any, b: any, c: any) {
	// 	return {
	// 		text: `${element.attribute('name_ru')} ${bigNumberFormatter(element.attribute('value'))}`,
	// 	}
	// }

	// const customizeText = (args: { end: number, start: number, index: number }) => {
	// 	const { end, start, index } = args
	// 	const formattedStart = bigNumberFormatter(start)
	// 	const formattedEnd = bigNumberFormatter(end)
	// 	const percent = ((index * 2) / 10) * 100
	// 	const isLowestGroup = percent === 0
	// 	const isHighestGroup = percent === 100
	// 	if (isLowestGroup) return `<b>low</b> (${formattedStart} - ${formattedEnd})`
	// 	if (isHighestGroup) return `<b>high</b> (${formattedStart} - ${formattedEnd})`

	// 	return `${percent}% (${formattedStart} - ${formattedEnd})`
	// }

	// const colorGroups = [0, 50, 200, 1000, 5000, 300000, 1000000];

	return (
		<div style={{ position: 'relative' }}>
			<VectorMap
				id="vectorMap"
				// bounds={BOUNDS}
				// onClick={onMapClick}
				// onInitialized={onInitializedHandler}
			>
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
					colorGroups={[326.6, 45945.814217152365, 177886.95348993287, 309828.0927627134, 3971424.9]}
					label={{
						enabled: true,
						dataField: 'name_ru',
						font: {
							size: 10,
						},
					}}
				/>

				{/* <Tooltip
					enabled
					customizeTooltip={customizeTooltip}
				>
					<Border visible />
					<Font color="#fff" />
				</Tooltip> */}

				<Legend>
					<Source layer="regions" grouping="color" />
				</Legend>
				<div>
					<h1>hey</h1>
				</div>

			</VectorMap>
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
