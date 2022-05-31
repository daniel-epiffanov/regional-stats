/* eslint-disable import/extensions */
import { Chart } from 'devextreme-react'
import { ArgumentAxis, AxisLabel, CommonSeriesSettings, Font, Grid, Label, Legend, Series, Tooltip, ValueAxis } from 'devextreme-react/chart'
import { FC } from 'react'
import { useCurValuesContext } from '../context/curValuesContext'
import {
	linearRegression as getLinearRegression,
	linearRegressionLine as getLinearRegressionLine,
	mean as getMean
} from 'simple-statistics'
import Arrow from '../../components/Arrow'

type Props = Readonly<{
}>

const year = 2014

const RegressionLine: FC<Props> = () => {
	const {curStatData} = useCurValuesContext()

	if(!curStatData) return null

	console.log({curStatData})

	const getValuesByYear = (year: number) => {
		const values = Object.entries(curStatData)
		.map(curStatEntry => {
			const val = curStatEntry && curStatEntry[1] && curStatEntry[1].yearValues && curStatEntry[1].yearValues.find((yearValue) => yearValue.year === year)
			return val?.value
		})

		// @ts-ignore
		const valuesFiltered: number[] = values.filter(yv => !!yv)
		
		return valuesFiltered
	}

	const year2014 = getValuesByYear(2009)
	const year2015 = getValuesByYear(2010)
	const mean2014 = getMean(year2014)
	const mean2015 = getMean(year2015)
	const slope2015 = Math.atan(mean2015 - mean2014) * (180/Math.PI)

	console.log({year2014})
	console.log({year2015})
	console.log({mean2014})
	console.log({mean2015})
	console.log({slope2015})

	const getDeg = (slope: number) => Math.atan(slope) * (180/Math.PI)


	return (
		<div>

		{/* <Chart
			id="chart"
			dataSource={newdsWithTrendLine}
			size={{
				height: 150,
				width: 500,
			}}
			valueAxis={{
				visualRange: {
					endValue: 20,
					startValue: 10,
				}
			}}
		>
      <CommonSeriesSettings
			type="scatter"
			/>
      <Series
        valueField="val"
        argumentField="region"
				point={{
					size: 4
				}}
				/>
      <Series
        valueField="trendlineVal"
        argumentField="region"
				type="spline"
				dashStyle="dash"
				width={4}
				hoverMode="none"
				point={{
					visible: false,
				}}
				/>
    </Chart> */}

		<div style={{display: 'flex', gap: 20}}>
			<div>
				{/* <p>slope {year - 2}: {(5-0) / (newdsWithTrendLineAfterPrev[1].trendLineVal - newdsWithTrendLineAfterPrev[0].trendLineVal)}</p>
				<Arrow incline={getDeg(newdsWithTrendLineAfterPrevSlope)}/> */}
			</div>
		</div>

		</div>
	)
}

export default RegressionLine
