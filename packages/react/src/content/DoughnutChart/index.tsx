import { FC, useEffect, useState } from 'react'
import PieChart, {
	Legend,
	Series,
	Label,
	Connector,
	Export,
} from 'devextreme-react/pie-chart'
import dxPieChart from 'devextreme/viz/pie_chart'
import styles from './styles/index.module.scss'
import { useSelectionsContext } from '../context/selectionsContext'
import { useGeneralDataContext } from '../../context/GeneralDataContext'
import statisticsDataQuery from './customQueries/statisticsDataQuery'
import { StatisticsData, StatisticsYears } from '../../../../../sharedTypes/gqlQueries'
import bigNumberFormatter from '../../helpers/bigNumberFormatter'
import useComponentInstance from '../../hooks/useComponentInstance'

type Props = Readonly<{}>

const hideExtraStatisticsYears = (
	statisticsYears: StatisticsYears,
	instance: dxPieChart,
) => {
	const middleStatisticsYearIndex = Math.floor(statisticsYears.length / 2)
	const startStatisticsYearToShow = statisticsYears[middleStatisticsYearIndex]

	statisticsYears.forEach(statisticsYear => {
		const isShown = statisticsYear >= startStatisticsYearToShow
		if (!isShown) {
			const item = instance.getAllSeries()[0].getPointsByArg(statisticsYear)[0]
			// @ts-ignore
			item?.hide && item.hide()
		}
	})
}

const legendClickHandler = (e: any) => {
	const arg = e.target
	const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0]
	item.isVisible() ? item.hide() : item.show()
}

const customizeSeriesLabelTextHandler = (args: { value: number, percentText: string }) => {
	const { value, percentText } = args
	return `${bigNumberFormatter(value)} (${percentText})`
}

const DoughnutChart: FC<Props> = (props) => {
	const {
		selectedRegionName,
		selectedMainSectionName,
		selectedSubSectionName,
	} = useSelectionsContext()
	const { statisticsYears } = useGeneralDataContext()
	const { instance, onInitializedHandler } = useComponentInstance<dxPieChart>()

	const [dataSource, setDataSource] = useState<StatisticsData>([])
	const dataSourceHandler = (newDataSource: StatisticsData) => setDataSource(newDataSource)

	const updateDataSource = async () => {
		const statisticsData = await statisticsDataQuery({
			regionName: selectedRegionName,
			mainSectionName: selectedMainSectionName,
			subSectionName: selectedSubSectionName,
			startYear: statisticsYears[0],
			endYear: statisticsYears.slice(-1)[0],
		})
		if (!statisticsData) return
		dataSourceHandler(statisticsData)
	}

	useEffect(() => {
		if (!selectedRegionName || !selectedMainSectionName || !selectedSubSectionName) return
		updateDataSource()
	}, [selectedRegionName, selectedMainSectionName, selectedSubSectionName])

	useEffect(() => {
		if (!instance || dataSource.length === 0) return
		hideExtraStatisticsYears(statisticsYears, instance)
	}, [instance, dataSource.length])

	return (
		<div className={styles.PieChart}>
			<PieChart
				id="pie"
				type="doughnut"
				title={`"${selectedMainSectionName}" в разные годы`}
				palette="Violet"
				dataSource={dataSource}
				onLegendClick={legendClickHandler}
				onInitialized={onInitializedHandler}
			>
				<Series argumentField="year" valueField="value">
					<Label visible format="decimal" customizeText={customizeSeriesLabelTextHandler}>
						<Connector visible />
					</Label>
				</Series>
				<Export enabled />
				<Legend
					horizontalAlignment="right"
					verticalAlignment="center"
				/>
			</PieChart>
		</div>
	)
}

export default DoughnutChart
