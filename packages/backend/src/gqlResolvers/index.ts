import statisticsAllYears from './statisticsAllYears'
import statisticsRegionNames from './statisticsRegionNames'
import statisticsAllMainSectionNames from './statisticsAllMainSectionNames'
import statisticsSubSectionNames from './statisticsSubSectionNames'
import statisticsData from './statisticsData'
import regionCoords from './regionCoords'

const gqlResolvers = {
	Query: {
		statisticsRegionNames,
		statisticsAllYears,
		statisticsAllMainSectionNames,
		statisticsSubSectionNames,
		statisticsData,
		regionCoords
	},
}

export default gqlResolvers
