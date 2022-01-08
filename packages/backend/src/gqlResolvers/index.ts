import statisticsYears from './statisticsYears'
import statisticsRegionNames from './statisticsRegionNames'
import statisticsMainSectionNames from './statisticsMainSectionNames'
import statisticsSubSectionNames from './statisticsSubSectionNames'
import statisticsData from './statisticsData'
import coordsByRegionType from './coordsByRegionType'

const gqlResolvers = {
	Query: {
		statisticsYears,
		statisticsRegionNames,
		statisticsMainSectionNames,
		statisticsSubSectionNames,
		statisticsData,
		coordsByRegionType,
	},
}

export default gqlResolvers
