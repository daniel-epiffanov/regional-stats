/* eslint-disable import/extensions */
import React, { FC, useState } from 'react'
import axios from 'axios'
// import { LoadPanel } from 'devextreme-react/load-panel'
import { LoadIndicator } from 'devextreme-react/load-indicator'
import VectorMap, {
	Layer,
	Tooltip,
	Border,
	Font,
} from 'devextreme-react/vector-map'
// @ts-ignore
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js'
import { ClickEvent as MapClickEvent } from 'devextreme/viz/vector_map'
import { GqlResponse, MultipleRegionsCoords, RegionNames } from '../../../../../@types/gqlResolvers'
import styles from './styles/VectorMap.module.scss'

// @ts-ignore
// import MapToolbar from './MapToolbar'

interface Props {
	selectedRegionHandler: (newSelectedRegion: string) => void
}

type Response = GqlResponse<{
	multipleRegionsCoords: MultipleRegionsCoords,
	regionNames: RegionNames
}>

const bounds = [71, 97, 45, 26]

// console.log({ testData })

const VectorMapRComponent: FC<Props> = (props) => {
	const { selectedRegionHandler } = props

	const [mapCoords, setMapCoords] = useState<MultipleRegionsCoords>([])
	const [availableRgions, setAvailableRgions] = useState<RegionNames>(['Центральный федеральный округ'])

	function customizeLayer(elements: any) {
		elements.forEach((element: any) => {
			const name_ru = element.attribute('name_ru')
			if (!availableRgions.includes(name_ru)) {
				element.applySettings({
					hoverEnabled: false,
					opacity: 0.2,
					label: {
						enabled: true,
						dataField: 'yo',
					},
				})
			}
		})
	}

	React.useEffect(() => {
		console.log('process.env.REACT_APP_API_URL: ', process.env.REACT_APP_API_URL)
		if (process.env.REACT_APP_API_URL) {
			const query = `
			query {
				multipleRegionsCoords(type: "federalDistrict") {
					type,
					geometry {
						type,
						coordinates
					},
					properties {
						name_en
						name_ru
					}
				},
				regionNames
				
			}`

			axios
				.post<Response>(process.env.REACT_APP_API_URL, { query })
				.then((res) => {
					const { multipleRegionsCoords, regionNames } = res.data.data
					setMapCoords(multipleRegionsCoords)
					setAvailableRgions(regionNames)
				})
		}
	}, [])

	React.useEffect(() => {
		console.log({ mapCoords })
	}, [mapCoords])

	// const onSelectionChangedHandler = (e: any) => {
	// 	// @ts-ignore
	// 	const selectedObject = mapCoords.features[e.target.index]
	// 	const selectedObjectNameRu = selectedObject.properties.name_ru

	// 	console.log({ selectedObjectNameRu })
	// 	// changeSelectedRegion(selectedObjectNameRu)
	// }

	function onMapClick(e: MapClickEvent) {
		if (!e.target) return
		e.target.selected(true)
		const name_en = e.target.attribute('name_en')
		const name_ru = e.target.attribute('name_ru')
		selectedRegionHandler(name_ru)
	}

	return (
		<div style={{ position: 'relative' }}>
			<VectorMap
				// id="vector-map"
				// loadingIndicator={{ enabled: true }}
				bounds={bounds}
				// eslint-disable-next-line react/jsx-no-bind
				onClick={onMapClick}
				maxZoomFactor={4}
			// onSelectionChanged={onSelectionChangedHandler}
			>
				<Layer
					dataSource={{
						type: 'FeatureCollection',
						features: mapCoords,
					}}
					type="area"
					customize={customizeLayer}
				/>
				{/* <Tooltip
					enabled
				// customizeTooltip={customizeTooltip}
				>
					<Border visible />
					<Font color="#fff" />
				</Tooltip> */}
			</VectorMap>
		</div>
	)
}

export default VectorMapRComponent
