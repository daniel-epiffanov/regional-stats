import { gql } from 'apollo-server-express'
import fs from 'fs'
import path from 'path'

export default gql`
	${fs.readFileSync(path.join(__dirname, 'statisticsData.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'regionCoords.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statisticsMainSectionNames.graphql'), 'utf8')}

	type Query {
		statisticsRegionNames: [String],
		statisticsMainSectionNames(regionName: String): [statisticsMainSectionName],
		statisticsYears: [Int],
		statisticsSubSectionNames(regionName: String, mainSectionName: String): [String],
		statisticsData(regionName: String, mainSectionName: String, subSectionName: String, startYear: Int, endYear: Int): [StatisticsData],
		coordsByRegionType(type: String): [regionCoords],
	}
`
