import { StatData, StatYearValuePercents } from '../../../../sharedTypes/gqlQueries'
import { ResolverFnAsync } from './types/ResolverFn'

type Args = Readonly<{
	yearValues: StatData['yearValues']
}>

const statYearValuePercents: ResolverFnAsync<StatYearValuePercents> = async (
  parent: any,
  args: Args,
) => {
  const { yearValues } = args
  console.log({ yearValues })

  if (!yearValues) {
    return ([{
      percent: 0,
      value: 0,
      year: 2007,
    }])
  }

  const yearValuesMeans = yearValues.map(({ year, value }, i) => {
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

  return yearValuesMeans

//   return ([{
//     percent: 0,
//     value: 0,
//     year: 2007,
//   }])
}

export default statYearValuePercents
