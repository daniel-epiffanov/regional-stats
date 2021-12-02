import { FC, useEffect, useState } from 'react'
import PieChart, {
	Legend,
	Series,
	Tooltip,
	Format,
	Label,
	Connector,
	Export,
} from 'devextreme-react/pie-chart'
import axios from 'axios'
import styles from './styles/DoughnutChart.module.scss'
import { GqlResponse, StatisticsByYears } from '../../../../../@types/gqlResolvers'
import { hostApi } from '../../helpers/host'

interface Props {
	regionName: string,
	mainSectionName: string,
	subSectionTitle: string,
}

type Response = GqlResponse<{ statisticsByYears: StatisticsByYears }>

const populationByRegions = [{
	region: 'Asia',
	val: 4119626293,
}, {
	region: 'Africa',
	val: 1012956064,
}, {
	region: 'Northern America',
	val: 344124520,
}, {
	region: 'Latin America and the Caribbean',
	val: 590946440,
}, {
	region: 'Europe',
	val: 727082222,
}, {
	region: 'Oceania',
	val: 35104756,
}]

interface DataSource {
	year: number,
	val: string,
}

const test = [
	{ year: 2004, val: 30678.7 },
	{ year: 2005, val: 30453.2 },
]

const DoughnutChart: FC<Props> = (props) => {
	const { regionName, mainSectionName, subSectionTitle } = props

	const [dataSource, setDataSource] = useState<DataSource[]>([])

	useEffect(() => {
		console.log({ regionName })
		console.log({ mainSectionName })
		console.log({ subSectionTitle })
		if (!regionName || !mainSectionName || !subSectionTitle) return

		const query = `
			query {
				statisticsByYears (
					regionName: "${regionName}",
					mainSectionName: "${mainSectionName}",
					subSectionTitle: "${subSectionTitle}",
					startYear: 2000,
					endYear: 2005
				) {
					year,
					value
				}
			}`
		console.log({ query })

		axios
			.post<Response>(hostApi, { query })
			.then((res) => {
				const { statisticsByYears } = res.data.data
				const parsedStatisticsByYears = statisticsByYears
					.map(({ year, value }) => ({ year, val: value }))
				setDataSource(parsedStatisticsByYears)
				console.log({ statisticsByYears })
			})
	}, [regionName, mainSectionName, subSectionTitle])

	function legendClickHandler(e: any) {
		const arg = e.target
		const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0]
		item.isVisible() ? item.hide() : item.show()
		// item.setInvisibility(!item.isVisible())
		// console.log({ e })
		// console.log({ item })
		// console.log({ arg })
		// debugger

		// this.toggleVisibility(item);
	}

	return (
		<div className={styles.PieChart}>
			<PieChart
				id="pie"
				type="doughnut"
				title={`"${subSectionTitle}" в разные годы`}
				palette="Soft Pastel"
				dataSource={dataSource}
				onLegendClick={legendClickHandler}
			>
				<Series argumentField="year">
					<Label visible format="decimal">
						<Connector visible />
					</Label>
				</Series>
				<Export enabled />
				<Legend
					// margin={0}
					horizontalAlignment="center"
					verticalAlignment="bottom"
				/>
				{/* <Tooltip enabled customizeTooltip={this.customizeTooltip}>
				<Format type="millions" />
			</Tooltip> */}
			</PieChart>
		</div>
	)
}

export default DoughnutChart
