import ResponsiveBox, {
	Row, Col, Item, Location,
} from 'devextreme-react/responsive-box'
import { useState, useEffect } from 'react'
import useSelectedSectionNames from './hooks/useSelectedSectionNames'
import SectionsTree from './SectionsTree'
// import DoughnutChart from './DoughnutChart'
import styles from './styles/Home.module.scss'
import VectorMap from './VectorMap'

interface SelectedSections {

}

export type SelectionMode = 'multiple' | 'single'

const Home = () => {
	const [selectedRegion, setSelectedRegion] = useState<string>('')
	const selectedRegionHandler = (newSelectedRegion: string) => setSelectedRegion(newSelectedRegion)
	const {
		selectedMainSectionName, selectedSubSectionTitle,
		selectedSectionNamesHandler,
	} = useSelectedSectionNames()

	useEffect(() => {
		console.log({ selectedRegion })
		console.log({ selectedMainSectionName })
		console.log({ selectedSubSectionTitle })
	}, [selectedRegion, selectedMainSectionName, selectedSubSectionTitle])

	return (
		<ResponsiveBox>
			<Row ratio={1} />
			<Row ratio={1} />
			<Row ratio={1} />
			<Row ratio={0.7} />
			<Col ratio={1} />

			<Item>
				<Location screen="md lg" row={0} col={0} />
				<div>
					<VectorMap
						selectedRegionHandler={selectedRegionHandler}
						selectedRegion={selectedRegion}
						mainSectionName={selectedMainSectionName}
						subSectionTitle={selectedSubSectionTitle}
					/>
				</div>
			</Item>

			<Item>
				<Location screen="md lg" row={1} col={0} />
				<div>
					{/* <DoughnutChart
						selectedRegion={selectedRegion}
						mainSectionName={selectedMainSectionName}
						subSectionTitle={selectedSubSectionTitle}
					/> */}
				</div>
			</Item>
			<Item>
				<Location screen="md lg" row={2} col={0} />
				<div>
					<SectionsTree selectedSectionNamesHandler={selectedSectionNamesHandler} />
				</div>
			</Item>

		</ResponsiveBox>
	)
}
export default Home
