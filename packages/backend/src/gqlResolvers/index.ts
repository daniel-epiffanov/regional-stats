import statisticsAllYears from './statisticsAllYears'
import statisticsRegionNames from './statisticsRegionNames'
import statisticsAllMainSectionNames from './statisticsAllMainSectionNames'
import statisticsSubSectionNames from './statisticsSubSectionNames'
import statisticsData from './statisticsData'
import coordsByRegionType from './coordsByRegionType'

const gqlResolvers = {
	Query: {
		statisticsRegionNames,
		statisticsAllYears,
		statisticsAllMainSectionNames,
		statisticsSubSectionNames,
		statisticsData,
		coordsByRegionType
	},
}

export default gqlResolvers
