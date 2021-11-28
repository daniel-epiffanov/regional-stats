/* eslint-disable import/extensions */
import React, { FC } from 'react'
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
import { GqlResponse, MultipleRegionsCoords } from '../../../../../@types/gqlResolvers'
import styles from './styles/VectorMap.module.scss'

// @ts-ignore
// import MapToolbar from './MapToolbar'

interface Props {
	selectedRegionHandler: (newSelectedRegion: string) => void
}

type Response = GqlResponse<{ multipleRegionsCoords: MultipleRegionsCoords }>

const bounds = [71, 97, 45, 26]

// function customizeLayer(elements: any) {
// 	elements.forEach((element: any) => {
// 		// console.log(element.attribute('name_ru'))
// 		// const country = countries[element.attribute('name')]
// 		// if (country) {
// 		element.applySettings({
// 			color: '#004a8c61',
// 			hoveredColor: '#002e8324',
// 			selectedColor: '#004a8c61',
// 		})
// 		// }
// 	})
// }

// console.log({ testData })

const VectorMapRComponent: FC<Props> = (props) => {
	const { selectedRegionHandler } = props

	const [mapCoords, setMapCoords] = React.useState<MultipleRegionsCoords>([])

	// const getCoords = () => ({
	// 	type: 'FeatureCollection',
	// 	features: mapCoords,
	// })

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
				
			}`

			axios
				.post<Response>(process.env.REACT_APP_API_URL, { query })
				.then((res) => {
					const { multipleRegionsCoords } = res.data.data
					// console.log({ data })
					// console.log({ res })
					// console.log(data.data.mapCoords)
					// const changedData = data.data.mapCoords
					setMapCoords(multipleRegionsCoords)
					// eslint-disable-next-line no-debugger
					// debugger
					// if (Array.isArray(res.data)) scndTopLvlData(data)
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
		// @ts-ignore
		// const attributes = e.target.attribute()
		// console.log({ attributes })
		// debugger
		// if (e.target && mapCoords[e.target.attribute('name_en')]) {
		e.target.selected(true)
		// }
		const name_en = e.target.attribute('name_en')
		const name_ru = e.target.attribute('name_ru')
		selectedRegionHandler(name_ru)
	}

	return (
		<div style={{ position: 'relative' }}>
			<VectorMap
				id="vector-map"
				loadingIndicator={{ enabled: true }}
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
				// customize={customizeLayer}
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
