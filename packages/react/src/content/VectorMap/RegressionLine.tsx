/* eslint-disable import/extensions */
import { Chart } from 'devextreme-react'
import { ArgumentAxis, AxisLabel, CommonSeriesSettings, Font, Grid, Label, Legend, Series, Tooltip, ValueAxis } from 'devextreme-react/chart'
import { FC } from 'react'
import { useCurValuesContext } from '../context/curValuesContext'
import {
	linearRegression as getLinearRegression,
	linearRegressionLine as getLinearRegressionLine
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
		return Object.entries(curStatData)
			.map(curStatEntry => {
				const val = curStatEntry && curStatEntry[1] && curStatEntry[1].yearValues && curStatEntry[1].yearValues.find((yearValue) => yearValue.year === year)
				 return({
					 region:curStatEntry[0],
					 val: val?.value
				})
			})
			.filter((yearValue: any, i) => !!yearValue && !!yearValue.val)
	}

	const newds = getValuesByYear(year)
	console.log({newds})
	// const prev = getValuesByYear(year - 1)
	// const next = getValuesByYear(year + 1)
	// const prevAfterPrev = getValuesByYear(year - 2)
	// const nextAfterNext = getValuesByYear(year + 2)

	const getDataSourceWithTrendline = (values: {
    region: string;
    val: number | undefined;
	}[]) => {

			const newdsStat = values.map((value, i) => [i, parseFloat(`${value.val}`)])
			const statData = getLinearRegression(newdsStat)
			const fn = getLinearRegressionLine(statData)
			return values.map((value, i)=> ({...value, trendlineVal: value.val ? fn(i) : null}))
		}
	const getTrendingLineSlope = (values: {
		region: string;
		val: number | undefined;
	}[]) => {

		const newdsStat = values.map((value, i) => [i, parseFloat(`${value.val}`)])
		const statData = getLinearRegression(newdsStat)
		const fn = getLinearRegressionLine(statData)
		return [{
			val: 0,
			trendLineVal: fn(0)
		}, {
			val: 5,
			trendLineVal: fn(5)
		}]
	}

	const newdsWithTrendLine = getDataSourceWithTrendline(newds)
	console.log({newdsWithTrendLine})
	// const newdsWithTrendLineNext = getTrendingLineSlope(next)
	// const newdsWithTrendLinePrev = getTrendingLineSlope(prev)
	// const newdsWithTrendLineAfterPrev = getTrendingLineSlope(prevAfterPrev)
	// const newdsWithTrendLineAfterNext = getTrendingLineSlope(nextAfterNext)

	// const newdsWithTrendLineNextSlope = (newdsWithTrendLineNext[1].trendLineVal - newdsWithTrendLineNext[0].trendLineVal) / 5
	// const newdsWithTrendLinePrevSlope = (newdsWithTrendLinePrev[1].trendLineVal - newdsWithTrendLinePrev[0].trendLineVal) / 5
	// const newdsWithTrendLineAfterPrevSlope = (newdsWithTrendLineAfterPrev[1].trendLineVal - newdsWithTrendLineAfterPrev[0].trendLineVal) / 5
	// const newdsWithTrendLineAfterNextSlope = (newdsWithTrendLineAfterNext[1].trendLineVal - newdsWithTrendLineAfterNext[0].trendLineVal) / 5

	const getDeg = (slope: number) => Math.atan(slope) * (180/Math.PI)

	console.log({newdsWithTrendLine})

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
