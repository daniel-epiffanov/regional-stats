/* eslint-disable import/extensions */
import { Chart } from 'devextreme-react'
import { ArgumentAxis, AxisLabel, Font, Grid, Label, Legend, Series, Tooltip, ValueAxis } from 'devextreme-react/chart'
import { FC } from 'react'
import { useCurValuesContext } from '../context/curValuesContext'
import styles from './styles/TopRegions.module.scss'
import {
	mean as getMean,
	median as getMedian,
	mode as getMode,
} from 'simple-statistics'

type Props = Readonly<{
	
}>


const TopRegions: FC<Props> = () => {
	const {curStatData} = useCurValuesContext()
	if(!curStatData) return null
	const values = Object.values(curStatData).map(curStatItem=> curStatItem.yearValues[0].value)

	const dataSourceTop = [
		{
			region: 'Иркутская область',
			value: curStatData['Иркутская область'].yearValues.slice(-1)[0].value
		},
		{
			region: 'Рязанская область',
			value: curStatData['Рязанская область'].yearValues.slice(-1)[0].value
		},
		{
			region: 'Нижегородская область',
			value: curStatData['Нижегородская область'].yearValues.slice(-1)[0].value
		},
	]

	const dataSourceBottom = [
		{
			region: 'Тверская область',
			value: curStatData['Тверская область'].yearValues.slice(-1)[0].value
		},
		{
			region: 'Томская область',
			value: curStatData['Томская область'].yearValues.slice(-1)[0].value
		},
		{
			region: 'Пермский край',
			value: curStatData['Пермский край'].yearValues.slice(-1)[0].value
		},
	]

	return (
		<div className={styles['root']}>
			<div>
				<p>dot: regions with significant chnage on this value in the past 5 years</p>
				<p>mean: {getMean(values)}</p>
				<p>median: {getMedian(values)}</p>
				<p>mode: {getMode(values)}</p>
			</div>
		<Chart
		title="Top regions"
		id="chart"
		dataSource={dataSourceTop}
		rotated={true}
		size={{
			height: 50,
			width: 100,
		}}
		rtlEnabled
		>
		<Series
				valueField="value"
				argumentField="region"
				name="My oranges"
				type="bar"
				// color="blue"
				/>
		</Chart>

{/* <div style={{width: 200}} > */}
		<Chart
				title="Bottom regions"
		id="chart"
		dataSource={dataSourceBottom}
		rotated={true}
		size={{
			height: 60,
			width: 130,
		}}
		>
			<ValueAxis>
				<AxisLabel visible={false} />
				<Grid visible={false}/>
			</ValueAxis>

			<ArgumentAxis>
				<AxisLabel
					visible={true}
					position="right"
					indentFromAxis={3}
				>
					<Font
					color="black"
					size={10}
					/>
				</AxisLabel>
			</ArgumentAxis>

			<Legend visible={false} />

			<Tooltip enabled />
			<Series
				// valueField="region"
				// argumentField="value"
				valueField="value"
				argumentField="region"
				name="My oranges"
				type="bar"
				color="green"
				>
					{/* <ValueAxis /> */}
					{/* <Label
					position="column"
					visible
					// position="outside"
					// rotationAngle={45}
					// verticalOffset={-200}
					// horizontalOffset={650}
					// alignment="right"
					// template={(a: any)=> {

					// 	console.log({a})

					// 	return <h1>{a.argumentText}</h1>
					// }}
					textOverflow
					customizeText={(a: any)=> {

						console.log({a})

						return `<h1 class="yo">${a.argumentText}</h1>`
					}}
					/> */}
				</Series>
		</Chart>
{/* </div> */}
		</div>
	)
}

export default TopRegions
