import statYears from './statYears'
import statRegionNames from './statRegionNames'
import statFirstCategories from './statFirstCategories'
import statSecondCategories from './statSecondCategories'
import statThirdCategories from './statThirdCategories'
import statData from './statData'
import regionCoords from './regionCoords'
import statYearValuePercents from './statYearValuePercents'

const gqlResolvers = {
  Query: {
    statRegionNames,
    statYears,
    statFirstCategories,
    statSecondCategories,
    statThirdCategories,
    statData,
    regionCoords,
    statYearValuePercents,
  },
}

export default gqlResolvers
