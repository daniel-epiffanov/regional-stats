import { gql } from 'apollo-server-express'
import fs from 'fs'
import path from 'path'

export default gql`
	${fs.readFileSync(path.join(__dirname, 'statisticsData.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'regionCoords.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statisticsAllMainSectionNames.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statisticsSubSectionNames.graphql'), 'utf8')}

	type Query {
		statisticsRegionNames: [String],
		statisticsAllMainSectionNames: [statisticsMainSectionName],
		statisticsSubSectionNames(mainSectionName: String): [statisticsSubSectionName],
		statisticsAllYears: [Int],
		statisticsData(regionName: String, mainSectionName: String, subSectionName: String, subSectionChildName: String): StatisticsData,
		regionCoords(regionType: String): [regionCoords],
	}
`
