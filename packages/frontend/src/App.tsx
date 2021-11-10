import React from 'react'
import './styles/App.module.scss'
// import themes from 'devextreme/ui/themes'
import themes from 'devextreme/ui/themes'
import ToolBar from './components/ToolBar/ToolBar'
import VectorMapRComponent from './components/VectorMap'
import RangeSelector from './components/RangeSelector'
import ChartWrapper from './components/Charts/ChartWrapper'

const appMainHeader = 'Росстат'

themes.current(window.localStorage.getItem('dx-theme') || 'material.blue.light')

function App() {
	const [selectedRegion, setSelectedRegion] = React
		.useState(process.env.INITIAL_MAP_VALUE || '')

	const changeSelectedRegion = (newSelectedRegion: string) => {
		setSelectedRegion(newSelectedRegion)
	}

	React.useEffect(() => {
		console.log({ selectedRegion })
	}, [selectedRegion])

	return (
		<div>
			<h1 className="display-none">{appMainHeader}</h1>
			<ToolBar />
			<ChartWrapper />
			<VectorMapRComponent changeSelectedRegion={changeSelectedRegion} />
		</div>
	)
}

export default App
