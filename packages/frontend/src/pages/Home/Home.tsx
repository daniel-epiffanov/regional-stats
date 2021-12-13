import ResponsiveBox, {
	Row, Col, Item, Location,
} from 'devextreme-react/responsive-box'
import { useState, useEffect } from 'react'
// import DoughnutChart from './DoughnutChart'
// import SectionsTree from './SectionsTree'
import styles from './styles/Home.module.scss'
import VectorMap from './VectorMap'

interface SelectedSections {

}

export type SelectionMode = 'multiple' | 'single'

const Home = () => {
	const [selectedRegion, setSelectedRegion] = useState<string>('')
	const [selectedMainSectionName, setSelectedMainSectionName] = useState<string>('')
	const [selectedSubSectionTitle, setSelectedSubSectionTitle] = useState<string>('')

	const selectedRegionHandler = (newSelectedRegion: string) => {
		setSelectedRegion(newSelectedRegion)
	}
	const selectedSectionsHandler = (
		_selectedMainSectionName: string,
		_selectedSubSectionTitle: string,
	) => {
		setSelectedMainSectionName(_selectedMainSectionName)
		setSelectedSubSectionTitle(_selectedSubSectionTitle)
	}

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
					{/* <SectionsTree selectedSectionsHandler={selectedSectionsHandler} /> */}
				</div>
			</Item>

		</ResponsiveBox>
	)
}
export default Home
