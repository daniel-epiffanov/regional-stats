// import { IResolvers } from 'graphql-tools'
import years from './years'
import regionNames from './regionNames'
import mainSectionNames from './mainSectionNames'
import subSectionNames from './subSectionTitles'
import statisticsByYears from './statisticsByYears'
import coordsByRegionType from './coordsByRegionType'

const gqlResolvers = {
	Query: {
		years,
		regionNames,
		mainSectionNames,
		subSectionNames,
		statisticsByYears,
		coordsByRegionType,
	},
}

export default gqlResolvers
