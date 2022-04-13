import { gql } from 'apollo-server-express'
import fs from 'fs'
import path from 'path'

export default gql`
	${fs.readFileSync(path.join(__dirname, 'statData.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'regionCoords.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statMainSectionNames.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statSubSectionNames.graphql'), 'utf8')}

	type Query {
		statRegionNames: [String],
		statMainSectionNames: [StatMainSectionName],
		statSubSectionNames(mainSectionName: String): [StatSubSectionName],
		statYears: [Int],
		statData(regionName: String, mainSectionName: String, subSectionName: String, subSectionChildName: String): StatData,
		regionCoords(regionType: String): [RegionCoords],
	}
`
