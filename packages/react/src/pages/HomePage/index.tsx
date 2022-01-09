import ResponsiveBox, {
	Row, Col, Item, Location,
} from 'devextreme-react/responsive-box'
import { FC } from 'react'
import { SelectionsProvider } from './context/selectionsContext'
import DoughnutChart from './DoughnutChart'
import MenuSectionsTree from './MenuSectionsTree'
import styles from './styles/index.module.scss'
import VectorMap from './VectorMap'

const HomePageLayout: FC = () => {
	// const {
	// 	selectedRegionName,
	// 	selectedMainSectionName,
	// 	selectedSubSectionName,
	// } = useSelectionsContext()

	// useEffect(() => {
	// 	console.log({ selectedRegionName })
	// 	console.log({ selectedMainSectionName })
	// 	console.log({ selectedSubSectionName })
	// }, [selectedRegionName, selectedMainSectionName, selectedSubSectionName])

	return (
		<ResponsiveBox>
			<Row ratio={1} />
			<Row ratio={1} />
			<Col ratio={1} />
			<Col ratio={2} />

			<Item>
				<Location screen="sm md lg" row={0} col={1} />
				<div>
					<VectorMap />
				</div>
			</Item>

			<Item>
				<Location screen="md lg" row={1} col={1} />
				<div>
					<DoughnutChart />
				</div>
			</Item>
			<Item>
				<Location screen="sm md lg" row={0} col={0} rowspan={2} />
				<div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
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
