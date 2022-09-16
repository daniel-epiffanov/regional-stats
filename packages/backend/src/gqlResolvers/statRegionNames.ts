import { StatRegionNames } from '../../../../sharedTypes/gqlQueries'
import StatisticsModel from '../mongoModels/annualStatsOfRegion'
import { ResolverFnAsync } from './types/ResolverFn'

const statisticsRegionNames: ResolverFnAsync<StatRegionNames> = async () => {
  const mongoRes: ReadonlyArray<string> = await StatisticsModel.distinct('regionName')
  const regions: ReadonlyArray<string> = mongoRes.filter(region => region !== 'Российская Федерация')
  return regions
}

export default statisticsRegionNames
