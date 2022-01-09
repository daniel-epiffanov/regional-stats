import { FC, useEffect, useState } from 'react'
import PieChart, {
	Legend,
	Series,
	Label,
	Connector,
	Export,
} from 'devextreme-react/pie-chart'
import { DataSourceLike } from 'devextreme/data/data_source'
import { BaseChartOptions } from 'devextreme/viz/chart_components/base_chart'
import styles from './styles/index.module.scss'
import { useSelectionsContext } from '../context/selectionsContext'
import { useSimpleQueriesContext } from '../../../context/simpleQueriesContext'
import statisticsDataQuery from './customQueries/statisticsDataQuery'
import { StatisticsDataResponse } from '../../../../../../sharedTypes/gqlQueries'
import bigNumberFormatter from '../../../helpers/bigNumberFormatter'

type Props = Readonly<{}>

const DoughnutChart: FC<Props> = (props) => {
	const {
		selectedRegionName,
		selectedMainSectionName,
		selectedSubSectionName,
	} = useSelectionsContext()
	const { statisticsYears } = useSimpleQueriesContext()

	const [dataSource, setDataSource] = useState<StatisticsDataResponse>([])

	useEffect(() => {
		if (!selectedRegionName || !selectedMainSectionName || !selectedSubSectionName) return

		(async () => {
			const statisticsData = await statisticsDataQuery({
				regionName: selectedRegionName,
				mainSectionName: selectedMainSectionName,
				subSectionName: selectedSubSectionName,
				startYear: statisticsYears[0],
				endYear: statisticsYears.slice(-1)[0],
			})
			if (!statisticsData) return
			setDataSource(statisticsData)
		})()
	}, [selectedRegionName, selectedMainSectionName, selectedSubSectionName])

	function legendClickHandler(e: any) {
		const arg = e.target
		const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0]
		item.isVisible() ? item.hide() : item.show()
	}

	const customizeTextHandler = (args: { value: number, percentText: string }) => {
		console.log({ args })
		const { value, percentText } = args
		return `${bigNumberFormatter(value)} (${percentText})`
	}

	return (
		<div className={styles.PieChart}>
			<PieChart
				id="pie"
				type="doughnut"
				title={`"${selectedMainSectionName}" в разные годы`}
				palette="Soft Pastel"
				dataSource={dataSource}
				onLegendClick={legendClickHandler}
			>
				<Series argumentField="year" valueField="value">
					<Label visible format="decimal" customizeText={customizeTextHandler}>
						<Connector visible />
					</Label>
				</Series>
				<Export enabled />
				<Legend
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
