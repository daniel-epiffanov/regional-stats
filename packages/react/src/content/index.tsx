import ResponsiveBox, {
	Row, Col, Item, Location,
} from 'devextreme-react/responsive-box'
import React, { FC } from 'react'
import { SelectionsProvider } from './context/selectionsContext'
import DoughnutChart from './DoughnutChart'
import MeasuresMenu from './MeasuresMenu'
import styles from './styles/index.module.scss'
import VectorMap from './VectorMap'

const HomePage: FC = () => {
	// const scrollhandler = (e: Event) => {
	// 	debugger
	// 	console.log('scroll')
	// 	e.preventDefault()
	// }

	return (
		<ResponsiveBox>
			<Row ratio={1} />
			<Row ratio={1} />
			<Col ratio={1} />
			<Col ratio={2} />

			<Item>
				<Location screen="sm md lg" row={0} col={0} rowspan={2} />
				<div className={styles['measures-menu-container']} id="measures-menu-container">
					<MeasuresMenu />
				</div>
			</Item>

			<Item>
				<Location screen="sm md lg" row={0} col={1} />
				<div className={styles['vector-map-container']} id="vector-map-container">
					<VectorMap />
				</div>
			</Item>

			{/* <Item>
				<Location screen="md lg" row={1} col={1} />
				<div>
					<DoughnutChart />
				</div>
			</Item> */}

		</ResponsiveBox>
	)
}

const HomePagePreloads: FC = () => {
	return (
		<SelectionsProvider>
			<HomePage />
		</SelectionsProvider>
	)
}

export default HomePagePreloads
