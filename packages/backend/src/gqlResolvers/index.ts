import statYears from './statYears'
import statRegionNames from './statRegionNames'
import statFirstCategories from './statFirstCategories'
import statSecondCategories from './statSecondCategories'
import statThirdCategories from './statThirdCategories'
import statData from './statData'
import regionCoords from './regionCoords'

const gqlResolvers = {
	Query: {
		statRegionNames,
		statYears,
		statFirstCategories,
		statSecondCategories,
		statThirdCategories,
		statData,
		regionCoords
	},
}

export default gqlResolvers
