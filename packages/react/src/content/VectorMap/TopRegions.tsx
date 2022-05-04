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

	const dataSource = [
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

	return (
		<div className={styles['root']}>
			<p>Top regions</p>
		<Chart
		id="chart"
		dataSource={dataSource}
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
				color="#ffaa66"
				/>
		</Chart>
		</div>
	)
}

export default TopRegions
