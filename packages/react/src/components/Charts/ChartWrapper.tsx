import React from 'react'
import axios from 'axios'
import ResponsiveBox, {
	Row, Col, Item, Location,
} from 'devextreme-react/responsive-box'
import styles from '../../styles/Charts/ChartWrapper.module.scss'
import DoughnutChart from '../../pages/HomePage/DoughnutChart'
import RangeSelector from '../RangeSelector'
import MultipleAxesChart from '../MultipleAxesChart'

const ChartWrapper = () => {
	React.useEffect(() => {
		if (process.env.REACT_APP_API_URL) {
			const query = `
				query {
					mapCoords(sort: "name_ru", input: {type: "region"}) {
						properties {
              name_ru
            },
						geometry {
							type
							coordinates
						}
					}
		}`

			axios
				.post(process.env.REACT_APP_API_URL, { query })
				.then((res) => {
					const { data } = res
					const changedData = data.data.mapCoords
				})
		}
	})

	return (
		<>

			<Item>
				<Location screen="md lg" row={0} col={1} />
				<Location screen="xs sm" row={1} col={0} />
				<div className="left-side-bar item">
					{/* <DoughnutChart /> */}
				</div>
			</Item>

			<Item>
				<Location screen="md lg" row={0} col={2} />
				<Location screen="xs sm" row={2} col={0} />
				<div className="right-side-bar item">
					<MultipleAxesChart />
				</div>
			</Item>
			<RangeSelector />
		</>
	)
}

export default ChartWrapper
