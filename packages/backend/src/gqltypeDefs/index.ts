import { gql } from 'apollo-server-express'
import fs from 'fs'
import path from 'path'

export default gql`
	${fs.readFileSync(path.join(__dirname, 'statisticsData.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'regionCoords.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statisticsMainSectionNames.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statisticsSubSectionNames.graphql'), 'utf8')}

	type Query {
		statisticsRegionNames: [String],
		statisticsMainSectionNames(regionName: String): [statisticsMainSectionName],
		statisticsSubSectionNames(regionName: String, mainSectionName: String): [statisticsSubSectionName],
		statisticsYears(regionName: String): [Int],
		statisticsData(regionName: String, mainSectionName: String, subSectionName: String, subSectionChildName: String): StatisticsData,
		coordsByRegionType(type: String): [regionCoords],
	}
`
