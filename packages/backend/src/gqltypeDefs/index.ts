import { gql } from 'apollo-server-express'
import fs from 'fs'
import path from 'path'

export default gql`
	${fs.readFileSync(path.join(__dirname, 'statisticsByYears.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'regionCoords.graphql'), 'utf8')}

	type Query {
		years(regionName: String): [Int],
		regionNames(regionName: String): [String],
		mainSectionNames: [String],
		subSectionNames(mainSectionName: String): [String],
		statisticsByYears(regionName: String, mainSectionName: String, subSectionName: String, startYear: Int, endYear: Int): [YearValue],
		coordsByRegionType(type: String): [regionCoords]
	}
`
