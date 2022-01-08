import years from './years'
import regionNames from './regionNames'
import mainSectionNames from './mainSectionNames'
import subSectionNames from './subSectionTitles'
import statisticsData from './statisticsData'
import coordsByRegionType from './coordsByRegionType'

const gqlResolvers = {
	Query: {
		years,
		regionNames,
		mainSectionNames,
		subSectionNames,
		statisticsData,
		coordsByRegionType,
	},
}

export default gqlResolvers
