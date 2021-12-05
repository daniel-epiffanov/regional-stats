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
import statisticsByYearsQuery from '../../queries/statisticsByYears'

interface Props {
	mainSectionName: string,
	subSectionTitle: string,
	selectedRegion: string,
}

type SingleSelectionResponse = GqlResponse<{ statisticsByYears: StatisticsByYears }>
type MultipleSelectionResponse = GqlResponse<{ [key: string]: StatisticsByYears }>

interface DataSource {
	value: string,
	year: number,
}

const DoughnutChart: FC<Props> = (props) => {
	const { mainSectionName, subSectionTitle, selectedRegion } = props

	const [dataSource, setDataSource] = useState<DataSource[]>([])

	useEffect(() => {
		if (!mainSectionName || !subSectionTitle || !selectedRegion) return
		const queryOptions = {
			selectedRegion, mainSectionName, subSectionTitle, startYear: 2000, endYear: 2005,
		};

		(async () => {
			const statisticsByYears = await statisticsByYearsQuery(queryOptions)
			if (!statisticsByYears) return
			setDataSource(statisticsByYears)
		})()
	}, [selectedRegion, mainSectionName, subSectionTitle])

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
				<Series argumentField="year" valueField="value">
					<Label visible format="decimal">
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
