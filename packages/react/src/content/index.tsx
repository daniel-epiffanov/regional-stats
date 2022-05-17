import ResponsiveBox, {
	Row, Col, Item, Location,
} from 'devextreme-react/responsive-box'
import { FC } from 'react'
import Chart from './Chart'
import { CurValuesProvider } from './context/curValuesContext'
import LookUp from './LookUp'
// import DoughnutChart from '../outdated/DoughnutChart'
// import MeasuresMenu from '../outdated/MeasuresMenu'
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
			<Row ratio={0}/>
			<Row ratio={1} />
			<Row ratio={0} />
			{/* <Col ratio={1} /> */}
			<Col ratio={1} />

			<Item>
				<Location screen="sm md lg" row={0} col={0} rowspan={1} />
				<LookUp />
				{/* <div className={styles['measures-menu-container']} id="measures-menu-container">
					<MeasuresMenu />
				</div> */}
			</Item>

			<Item>
				<Location screen="sm md lg" row={1} col={0} />
				{/* <div className={styles['vector-map-container']} id="vector-map-container"> */}
					<VectorMap />
				{/* </div> */}
			</Item>

			<Item>
				<Location screen="sm md lg" row={2} col={0} />
				{/* <div className={styles['vector-map-container']} id="vector-map-container"> */}
					<Chart />
				{/* </div> */}
			</Item>

			

		</ResponsiveBox>
	)
}

const HomePagePreloads: FC = () => {
	return (
		<CurValuesProvider>
			<HomePage />
		</CurValuesProvider>
	)
}

export default HomePagePreloads
