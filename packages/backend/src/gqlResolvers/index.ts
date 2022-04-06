import statisticsYears from './statisticsYears'
import statisticsRegionNames from './statisticsRegionNames'
import statisticsMainSectionNames from './statisticsMainSectionNames'
import statisticsSubSectionNames from './statisticsSubSectionNames'
import statisticsData from './statisticsData'
import coordsByRegionType from './coordsByRegionType'

const gqlResolvers = {
	Query: {
		statisticsRegionNames,
		statisticsYears,
		statisticsMainSectionNames,
		statisticsSubSectionNames,
		statisticsData,
		coordsByRegionType,
		test: async () => 'yey',
	},
}

export default gqlResolvers
