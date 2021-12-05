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
import { SelectionMode } from './Home'

interface Props {
	mainSectionName: string,
	subSectionTitle: string,
	selectionMode: SelectionMode,
	selectedRegions: string[],
	selectedRegion: string,
}

type SingleSelectionResponse = GqlResponse<{ statisticsByYears: StatisticsByYears }>
type MultipleSelectionResponse = GqlResponse<{ [key: string]: StatisticsByYears }>

interface DataSource {
	[key: string]: string | number,
	year: number,
}

const test = [
	{ year: 2004, val: 30678.7 },
	{ year: 2005, val: 30453.2 },
]

const DoughnutChart: FC<Props> = (props) => {
	const {
		mainSectionName, subSectionTitle, selectionMode, selectedRegions, selectedRegion,
	} = props

	const [dataSource, setDataSource] = useState<DataSource[]>([])

	useEffect(() => {
		if (!mainSectionName || !subSectionTitle) return

		if (selectionMode === 'single') {
			if (!selectedRegion) return
			const query = `
			query {
				statisticsByYears (
					regionName: "${selectedRegion}",
					mainSectionName: "${mainSectionName}",
					subSectionTitle: "${subSectionTitle}",
					startYear: 2000,
					endYear: 2005
				) {
					year,
					value
				}
			}`

			axios
				.post<SingleSelectionResponse>(hostApi, { query })
				.then((res) => {
					const { statisticsByYears } = res.data.data
					if (!statisticsByYears) return
					const parsedStatisticsByYears = statisticsByYears
						.map(({ year, value }) => ({ year, [selectedRegion]: value }))
					setDataSource(parsedStatisticsByYears)
					console.log({ statisticsByYears })
				})
		} else {
			if (!selectedRegions.length) return
			const query = `
			query {
				${selectedRegions.map((region, i) => `region${i}: statisticsByYears (
					regionName: "${selectedRegion}",
					mainSectionName: "${mainSectionName}",
					subSectionTitle: "${subSectionTitle}",
					startYear: 2000,
					endYear: 2005
				) {
					year,
					value
				}`)}
			}`

			axios
				.post<MultipleSelectionResponse>(hostApi, { query })
				.then((res) => {
					const data = res.data.data
					console.log({ data })
					if (!data) return
					const newDataSource: DataSource[] = []
					selectedRegions.forEach((region, regionIdx) => {
						const regionsData = data[`region${regionIdx}`]
						console.log({ regionsData })
						regionsData.forEach(({ year, value }, yearValueIdx) => {
							newDataSource[yearValueIdx] = {
								...regionsData[yearValueIdx],
								year,
								[region]: value,
							}
						})
					})
					// debugger
					setDataSource(newDataSource)
				})
		}
	}, [selectedRegion, mainSectionName, subSectionTitle, selectionMode, selectedRegions])

	useEffect(() => {
		console.log({ dataSource })
	}, [dataSource])

	function legendClickHandler(e: any) {
		const arg = e.target
		const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0]
		item.isVisible() ? item.hide() : item.show()
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
				{selectionMode === 'single' && (
					<Series argumentField="year" valueField={selectedRegion}>
						<Label visible format="decimal">
							<Connector visible />
						</Label>
					</Series>
				)}
				{selectionMode === 'multiple' && selectedRegions.map((region) => (
					<Series argumentField="year" valueField={region}>
						<Label visible format="decimal">
							<Connector visible />
						</Label>
					</Series>
				))}
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
