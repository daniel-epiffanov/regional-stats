import statYears from './statYears'
import statRegionNames from './statRegionNames'
import statMainCategories from './statMainCategories'
import statSubCategories from './statSubCategories'
import statData from './statData'
import regionCoords from './regionCoords'

const gqlResolvers = {
	Query: {
		statRegionNames,
		statYears,
		statMainCategories,
		statSubCategories,
		statData,
		regionCoords
	},
}

export default gqlResolvers
