import ResponsiveBox, {
	Row, Col, Item, Location,
} from 'devextreme-react/responsive-box'
import { useState, useEffect, FC } from 'react'
import { SelectionsProvider, useSelectionsContext } from './context/selectionsContext'
import useSelectedRegion from './hooks/useSelectedRegion'
import useSelectedSectionNames from './hooks/useSelectedSectionNames'
import MenuSectionsTree from './MenuSectionsTree'
import styles from './styles/index.module.scss'
import VectorMap from './VectorMap'

const HomePageLayout: FC = () => {
	const {
		selectedRegionName,
		selectedMainSectionName,
		selectedSubSectionName,
	} = useSelectionsContext()

	useEffect(() => {
		console.log({ selectedRegionName })
		console.log({ selectedMainSectionName })
		console.log({ selectedSubSectionName })
	}, [selectedRegionName, selectedMainSectionName, selectedSubSectionName])

	return (
		<ResponsiveBox>
			<Row ratio={1} />
			<Row ratio={1} />
			<Row ratio={1} />
			<Row ratio={0.7} />
			<Col ratio={1} />

			<Item>
				<Location screen="sm md lg" row={0} col={0} />
				<div>
					<VectorMap />
				</div>
			</Item>

			{/* <Item>
				<Location screen="md lg" row={1} col={0} />
				<div>
					<DoughnutChart
						selectedRegionName={selectedRegionName}
						mainSectionName={selectedMainSectionName}
						subSectionTitle={selectedSubSectionTitle}
					/>
				</div>
			</Item> */}
			<Item>
				<Location screen="sm md lg" row={2} col={0} />
				<div>
					<MenuSectionsTree />
				</div>
			</Item>

		</ResponsiveBox>
	)
}

const HomePage: FC = () => {
	return (
		<SelectionsProvider>
			<HomePageLayout />
		</SelectionsProvider>
	)
}

export default HomePage
