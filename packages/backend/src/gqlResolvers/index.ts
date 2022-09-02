import statYears from './statYears'
import statRegionNames from './statRegionNames'
import statFirstCategories from './statFirstCategories'
import statSecondCategories from './statSecondCategories'
import statThirdCategories from './statThirdCategories'
import statData from './statData'
import mapRegionCoords from './mapRegionCoords'
import mapRegionNames from './mapRegionNames'
import statYearValuePercents from './statYearValuePercents'
import statYearMeanPercents from './statYearMeanPercents'
import statRating from './statRating'

const gqlResolvers = {
  Query: {
    statRegionNames,
    statYears,
    statFirstCategories,
    statSecondCategories,
    statThirdCategories,
    statData,
    mapRegionCoords,
    statYearValuePercents,
    statYearMeanPercents,
    statRating,
    mapRegionNames,
  },
}

export default gqlResolvers
