import { mean as getMean } from 'simple-statistics'
import { StatData, StatYearMeanPercents } from '../../../../sharedTypes/gqlQueries'
import { ResolverFnAsync } from './types/ResolverFn'

type Args = Readonly<{
	yearValues: StatData['yearValues']
}>

type YearMean = Readonly<{
  year: number;
  mean: number;
}>

const statYearMeanPercents: ResolverFnAsync<StatYearMeanPercents> = async (
  parent: any,
  args: Args,
) => {
  const { yearValues } = args

  if (!Array.isArray(yearValues) || yearValues.length === 0) {
    return ([{
      percent: 0,
      mean: 0,
      year: 0,
    }])
  }

  const getValuesOfYear = (requestedYear: number) => {
    const values = yearValues
      .map(({ year, value }) => {
        const isRequiestedYear = year === requestedYear
        if (isRequiestedYear) return value
        return null
      })

    // @ts-ignore
    const valuesFiltered: number[] = values.filter(yv => !!yv)

    return valuesFiltered
  }

  const uniqueYears: number[] = [...new Set(yearValues.map(yearValue => yearValue.year))]

  const yearMeansRaw: (YearMean | null)[] = uniqueYears.map(year => {
    const valuesOfYear = getValuesOfYear(year)
    if (!Array.isArray(valuesOfYear) || valuesOfYear?.length === 0) return null
    return ({
      year,
      mean: getMean(valuesOfYear),
    })
  })
  const yearMeans: YearMean[] = yearMeansRaw
    .filter((yearMean): yearMean is YearMean => yearMean !== null)

  const yearMeanPercents = yearMeans.map(({ year, mean }, i) => {
    // if (!value) return null
    if (i === 0) {
      return {
        percent: 0,
        year,
        mean,
      }
    }

    const curYearValue = mean
    const prevYearValue = yearMeans[i - 1].mean
    const max = Math.max(curYearValue,	prevYearValue)
    const delta = curYearValue - prevYearValue
    const percent = Math.floor((delta * 100) / max)

    return ({
      year,
      mean,
      percent,
    })
  })
    .filter(item => !!item)

  // console.log({ yearMeanPercents })

  return yearMeanPercents
}

export default statYearMeanPercents
