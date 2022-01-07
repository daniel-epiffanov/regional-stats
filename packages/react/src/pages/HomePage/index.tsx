import ResponsiveBox, {
	Row, Col, Item, Location,
} from 'devextreme-react/responsive-box'
import { useState, useEffect, FC } from 'react'
import { SelectionParamsProvider, useSelectionParamsContext } from './context/selectionParamsContext'
import useSelectedRegion from './hooks/useSelectedRegion'
import useSelectedSectionNames from './hooks/useSelectedSectionNames'
import MenuSectionsTree from './MenuSectionsTree'
import styles from './styles/index.module.scss'
import VectorMap from './VectorMap'

const HomePageLayout: FC = () => {
	const {
		selectedRegion,
		selectedMainSectionName,
		selectedSubSectionName,
	} = useSelectionParamsContext()
	// const { selectedRegion, selectedRegionHandler } = useSelectedRegion()
	// const {
	// 	selectedMainSectionName, selectedSubSectionTitle,
	// 	selectedSectionNamesHandler,
	// } = useSelectedSectionNames()

	useEffect(() => {
		console.log({ selectedRegion })
		console.log({ selectedMainSectionName })
		console.log({ selectedSubSectionName })
	}, [selectedRegion, selectedMainSectionName, selectedSubSectionName])

	return (
		<ResponsiveBox>
			<Row ratio={1} />
			<Row ratio={1} />
			<Row ratio={1} />
			<Row ratio={0.7} />
			<Col ratio={1} />

			{/* <Item>
				<Location screen="md lg" row={0} col={0} />
				<div>
					<VectorMap
						selectedRegionHandler={selectedRegionHandler}
						selectedRegion={selectedRegion}
						mainSectionName={selectedMainSectionName}
						subSectionTitle={selectedSubSectionTitle}
					/>
				</div>
			</Item> */}

			{/* <Item>
				<Location screen="md lg" row={1} col={0} />
				<div>
					<DoughnutChart
						selectedRegion={selectedRegion}
						mainSectionName={selectedMainSectionName}
						subSectionTitle={selectedSubSectionTitle}
					/>
				</div>
			</Item> */}
			<Item>
				<Location screen="md lg sm" row={2} col={0} />
				<div>
					<MenuSectionsTree />
				</div>
			</Item>

		</ResponsiveBox>
	)
}

const HomePage: FC = () => {
	return (
		<SelectionParamsProvider>
			<HomePageLayout />
		</SelectionParamsProvider>
	)
}

export default HomePage
