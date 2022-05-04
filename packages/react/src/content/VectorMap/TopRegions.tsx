/* eslint-disable import/extensions */
import { Chart } from 'devextreme-react'
import { Series } from 'devextreme-react/chart'
import { FC } from 'react'
import { useCurValuesContext } from '../context/curValuesContext'
import styles from './styles/TopRegions.module.scss'

type Props = Readonly<{
	
}>


const TopRegions: FC<Props> = () => {
	const {curStatData} = useCurValuesContext()
	if(!curStatData) return null

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
		}
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

	return (
		<div className={styles['root']}>
			<p>dot - regions with significant chnage on this value in the past 5 years</p>
		<Chart
		title="Top regions"
		id="chart"
		dataSource={dataSourceTop}
		rotated={true}
		size={{
			height: 200,
			width: 250,
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

		<Chart
				title="Bottom regions"
		id="chart"
		dataSource={dataSourceBottom}
		rotated={true}
		size={{
			height: 200,
			width: 250,
		}}
		rtlEnabled
		>
		<Series
				valueField="value"
				argumentField="region"
				name="My oranges"
				type="bar"
				color="green"
				/>
		</Chart>
		</div>
	)
}

export default TopRegions
