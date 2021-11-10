import React from 'react'
import axios from 'axios'
import styles from '../styles/ChartWrapper.module.scss'
import DoughnutChart from '../DoughnutChart'
import RangeSelector from '../RangeSelector'
import MultipleAxesChart from '../MultipleAxesChart'

const ChartWrapper = () => {
	React.useEffect(() => {
		if (process.env.REACT_APP_API_URL) {
			const query = `
				query {
					mapCoords(sort: "name_ru", input: {type: "federalDistrict"}) {
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
					// console.log(data.data.mapCoords)
					const changedData = data.data.mapCoords
					// setMapCoords({
					// 	type: 'FeatureCollection',
					// 	features: changedData,
					// })
					// eslint-disable-next-line no-debugger
					// debugger
					// if (Array.isArray(res.data)) scndTopLvlData(data)
				})
		}
	})

	return (
		<div className={styles.ChartWrapper}>
			<div className={styles.chartsContainer}>
				<DoughnutChart />
				<MultipleAxesChart />
			</div>
			<RangeSelector />
		</div>
	)
}

export default ChartWrapper
