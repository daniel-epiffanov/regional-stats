import { GqlStatData, StatYearValuePercents } from '../../../../sharedTypes/gqlQueries'
import { ResolverFnAsync } from './types/ResolverFn'

type Args = Readonly<{
	yearValues: GqlStatData['yearValues']
}>

const statYearValuePercents: ResolverFnAsync<StatYearValuePercents> = async (
  parent: any,
  args: Args,
) => {
  const { yearValues } = args
  console.log({ yearValues })

  if (!Array.isArray(yearValues) || yearValues.length === 0) {
    return ([{
      percent: 0,
      value: 0,
      year: 0,
    }])
  }

  const yearValuePercents = yearValues.map(({ year, value }, i) => {
    // if (!value) return null
    if (i === 0) {
      return {
        percent: 0,
        year,
        value,
      }
    }

    const curYearValue = value
    const prevYearValue = yearValues[i - 1].value
    const max = Math.max(curYearValue,	prevYearValue)
    const delta = curYearValue - prevYearValue
    const percent = Math.floor((delta * 100) / max)

    return ({
      year,
      value,
      percent,
    })
  })
    .filter(item => !!item)

  return yearValuePercents

//   return ([{
//     percent: 0,
//     value: 0,
//     year: 2007,
//   }])
}

export default statYearValuePercents
