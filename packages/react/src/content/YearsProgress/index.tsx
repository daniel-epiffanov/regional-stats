import { FC } from 'react'
import { useCurValuesContext } from '../context/curValuesContext'
import { mean as getMean} from 'simple-statistics'
import { ScrollView } from 'devextreme-react/scroll-view'
import styles from './styles/idnex.module.scss'
import { useGeneralDataContext } from '../../context/GeneralDataContext'

type Props = Readonly<{
}>

const RegressionLine: FC<Props> = () => {
	const {curStatData} = useCurValuesContext()
	const { statYears } = useGeneralDataContext()

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

	// @ts-ignore
	const yearValuesMeans: ({year: number;mean: number;})[] = statYears.map(year => {
		const valuesByYear = getValuesByYear(year)
		if(!valuesByYear || valuesByYear?.length === 0) return null
		return ({
			year,
			mean: getMean(valuesByYear)
		})
	})
	.filter(yearValuesMean => !!yearValuesMean && !!yearValuesMean.mean)

	const yearValuesProcents = yearValuesMeans.map((yearValue, i) => {
		
		if(i === 0) return {
			percent: 0,
			year: yearValue.year,
		}
		const curYearMean = yearValue.mean
		const prevYearMean = yearValuesMeans[i-1].mean
		const max = Math.max(curYearMean,	prevYearMean)
		const delta = curYearMean - prevYearMean
		const percent = Math.floor((delta * 100) / max)

		return {
			percent,
			year: yearValue.year,
			mean: curYearMean
		}
	})

	console.log({ yearValuesProcents })

	return (
		<div className={styles['root']}>

			<h3>Mean annual groth (all regions)</h3>

			<ScrollView
        // height={100}
				width={800}
        direction="horizontal"
				showScrollbar="always"
			>
				<div className={styles['scroll-content']}>
						{yearValuesProcents.map(({percent, year, mean}) => {
							let borderColor = percent > 0 ? '#00800075' : '#ff00007a'
							if(percent === 0) borderColor = '#e2e2e2'

							return (
							<div className={styles['card']}>
								<div className={styles['card-line']} style={{	borderColor}}></div>
								<div className={styles['card-content']}>
									<p className={styles['card-procent']}>{percent > 0 ? '+' : '-'} {Math.abs(percent)} %</p>
									<p className={styles['card-mean']}>mean {Math.floor(mean || 0)} млн. $</p>
									<p className={styles['card-year']}>{year}</p>
								</div>
							</div>
						)})}
				</div>
      </ScrollView>

		</div>
	)
}

export default RegressionLine
