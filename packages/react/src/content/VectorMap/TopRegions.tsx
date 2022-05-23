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
import TopRegionChart from './TopRegionChart'

type Props = Readonly<{
	
}>


const TopRegions: FC<Props> = () => {
	const {curStatData} = useCurValuesContext()
	if(!curStatData) return null
	const values = Object.values(curStatData).map(curStatItem=> curStatItem.yearValues[0].value)

	const dataSourceTop = [
		{
			region: 'Ирк обл',
			value: curStatData['Иркутская область'].yearValues.slice(-1)[0].value
		},
		{
			region: 'Ряз обл',
			value: curStatData['Рязанская область'].yearValues.slice(-1)[0].value
		},
		{
			region: 'Ниж обл',
			value: curStatData['Нижегородская область'].yearValues.slice(-1)[0].value
		},
	]

	const dataSourceBottom = [
		{
			region: 'Тв обл',
			value: curStatData['Тверская область'].yearValues.slice(-1)[0].value
		},
		{
			region: 'Том обл',
			value: curStatData['Томская область'].yearValues.slice(-1)[0].value
		},
		{
			region: 'Пер кр',
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
			<TopRegionChart dataSource={dataSourceTop} />
			<TopRegionChart dataSource={dataSourceBottom} />
		</div>
	)
}

export default TopRegions
