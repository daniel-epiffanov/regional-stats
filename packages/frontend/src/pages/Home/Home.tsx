import ResponsiveBox, {
	Row, Col, Item, Location,
} from 'devextreme-react/responsive-box'
import { useState, useEffect } from 'react'
import { SelectedRegion } from '../../@types/states'
import DoughnutChart from './DoughnutChart'
import SectionsTree from './SectionsTree'
import styles from './styles/Home.module.scss'
import VectorMap from './VectorMap'

interface SelectedSections {

}

const Home = () => {
	const [selectedRegion, setSelectedRegion] = useState<SelectedRegion>('')
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

	useEffect(() => {
		console.log({ selectedRegion })
	}, [selectedRegion])

	return (
		<ResponsiveBox>
			<Row ratio={1} />
			<Row ratio={1} />
			<Row ratio={1} />
			<Row ratio={0.7} />
			<Col ratio={1} />
			{/* <Col ratio={1} screen="md lg" /> */}
			{/* <Col ratio={0.5} screen="md lg" /> */}

			<Item>
				<Location screen="md lg" row={0} col={0} />
				<div className="left-side-bar item">
					<VectorMap
						selectedRegionHandler={selectedRegionHandler}
						selectedRegion={selectedRegion}
					/>
				</div>
			</Item>

			<Item>
				<Location screen="md lg" row={1} col={0} />
				{/* <Location screen="xs sm" row={0} col={0} /> */}
				<div className="content item">
					<DoughnutChart
						regionName={selectedRegion}
						mainSectionName={selectedMainSectionName}
						subSectionTitle={selectedSubSectionTitle}
					/>
				</div>
			</Item>
			<Item>
				<Location screen="md lg" row={2} col={0} />
				{/* <Location screen="xs sm" row={0} col={0} /> */}
				<div>
					<SectionsTree selectedSectionsHandler={selectedSectionsHandler} />
				</div>
			</Item>

		</ResponsiveBox>
	)
}
export default Home
