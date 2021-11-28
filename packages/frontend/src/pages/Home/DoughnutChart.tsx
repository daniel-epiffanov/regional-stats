import React from 'react'
import PieChart, {
	Legend,
	Series,
	Tooltip,
	Format,
	Label,
	Connector,
	Export,
} from 'devextreme-react/pie-chart'
import styles from './styles/DoughnutChart.module.scss'

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

const DoughnutChart = () => (
	<div className={styles.PieChart}>
		<PieChart
			id="pie"
			type="doughnut"
			title='Параметр "население" в разные годы'
			palette="Soft Pastel"
			dataSource={populationByRegions}
		>
			<Series argumentField="region">
				<Label visible format="millions">
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

export default DoughnutChart
