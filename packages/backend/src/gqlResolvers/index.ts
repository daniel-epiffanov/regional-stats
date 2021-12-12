// import { IResolvers } from 'graphql-tools'
import years from './years'
import regionNames from './regionNames'
import mainSectionNames from './mainSectionNames'
import subSectionNames from './subSectionTitles'
import statisticsByYears from './statisticsByYears'
import multipleRegionsCoords from './multipleRegionsCoords'

const gqlResolvers = {
	Query: {
		years,
		regionNames,
		mainSectionNames,
		subSectionNames,
		statisticsByYears,
		multipleRegionsCoords,
	},
}

export default gqlResolvers
