import { gql } from 'apollo-server-express'
// import fs from 'fs'
// import path from 'path'

export default gql`

	type Query {
		years(regionName: String): [Int],
		regionNames(regionName: String): [String],
		mainSectionNames: [String],
		subSectionTitles(mainSectionName: String): [String],
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
