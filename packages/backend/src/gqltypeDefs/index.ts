import { gql } from 'apollo-server-express'
import fs from 'fs'
import path from 'path'

export default gql`
	${fs.readFileSync(path.join(__dirname, 'statisticsByYears.graphql'), 'utf8')}

	type Query {
		years(regionName: String): [Int],
		regionNames(regionName: String): [String],
		mainSectionNames: [String],
		subSectionTitles(mainSectionName: String): [String],
		statisticsByYears(mainSectionName: String, subSectionTitle: String, startYear: Int, endYear: Int): [YearValue]
	}
`

// # ${fs.readFileSync(path.join(__dirname, 'statisticsQuery.graphql'), 'utf8')}
// # ${fs.readFileSync(path.join(__dirname, 'mapCoordsQuery.graphql'), 'utf8')}

// # statistics(fileName: String): [ExcelFile],
// # mapCoords (
// # 	input: MapCoordsInput,
// # 	limit: Int,
// # 	sort: String,
// # 	skip: Int
// # 	): [MapCoords]
