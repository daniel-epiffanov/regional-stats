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
	Label,
	Legend,
	Source,
} from 'devextreme-react/vector-map'
// @ts-ignore
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js'
import { ClickEvent as MapClickEvent } from 'devextreme/viz/vector_map'
import { GqlResponse, MultipleRegionsCoords, RegionNames } from '../../../../../@types/gqlResolvers'
import styles from './styles/VectorMap.module.scss'
import { SelectedRegion } from '../../@types/states'
import { hostApi } from '../../helpers/host'

// @ts-ignore
// import MapToolbar from './MapToolbar'

interface Props {
	selectedRegionHandler: (newSelectedRegion: string) => void,
	selectedRegion: SelectedRegion
}

type Response = GqlResponse<{
	multipleRegionsCoords: MultipleRegionsCoords,
	regionNames: RegionNames
}>

const bounds = [71, 97, 45, 26]

// console.log({ testData })

const VectorMapRComponent: FC<Props> = (props) => {
	const { selectedRegionHandler, selectedRegion } = props

	const [mapCoords, setMapCoords] = useState<MultipleRegionsCoords>([])
	const [availableRgions, setAvailableRgions] = useState<RegionNames>(['Центральный федеральный округ'])

	function customizeLayer(elements: any) {
		elements.forEach((element: any) => {
			const name_ru = element.attribute('name_ru')
			// selectedRegion === name_ru && element.selected(true)

			if (availableRgions.includes(name_ru)) return
			element.applySettings({
				opacity: 0.2,
			})
		})
	}

	React.useEffect(() => {
		const query = `
			query {
				multipleRegionsCoords(type: "region") {
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

		console.log({ hostApi })

		axios
			.post<Response>(hostApi, { query })
			.then((res) => {
				const { multipleRegionsCoords, regionNames } = res.data.data
				console.log({ multipleRegionsCoords })
				console.log({ regionNames })
				setMapCoords(multipleRegionsCoords)
				setAvailableRgions(regionNames)
			})
	}, [])

	React.useEffect(() => {
		console.log({ mapCoords })
	}, [mapCoords])

	function customizeTooltip(element: any) {
		return {
			text: element.attribute('name_ru'),
		}
	}

	function onMapClick(e: MapClickEvent) {
		if (!e.target) return
		const name_ru = e.target.attribute('name_ru')
		if (!availableRgions.includes(name_ru)) return

		e.target.selected(true)

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
			// maxZoomFactor={5}
			>
				<Layer
					dataSource={{
						type: 'FeatureCollection',
						features: mapCoords,
					}}
					type="area"
					customize={customizeLayer}
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

			</VectorMap>
		</div>
	)
}

export default VectorMapRComponent
