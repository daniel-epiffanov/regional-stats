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
		subSectionTitles(mainSectionName: String): [String],
		statisticsByYears(regionName: String, mainSectionName: String, subSectionTitle: String, startYear: Int, endYear: Int): [YearValue],
		multipleRegionsCoords(type: String): [regionCoords]
	}
`
