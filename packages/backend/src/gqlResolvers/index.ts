import statYears from './statYears'
import statRegionNames from './statRegionNames'
import statMainSectionNames from './statMainSectionNames'
import statSubSectionNames from './statSubSectionNames'
import statData from './statData'
import regionCoords from './regionCoords'

const gqlResolvers = {
	Query: {
		statRegionNames,
		statYears,
		statMainSectionNames,
		statSubSectionNames,
		statData,
		regionCoords
	},
}

export default gqlResolvers
