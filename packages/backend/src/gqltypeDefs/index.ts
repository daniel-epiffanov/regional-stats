import { gql } from 'apollo-server-express'
import fs from 'fs'
import path from 'path'

export default gql`
	${fs.readFileSync(path.join(__dirname, 'statData.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'regionCoords.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statSubCategories.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statMainCategories.graphql'), 'utf8')}

	type Query {
		statRegionNames: [String],
		statFirstCategories: [String],
		statSecondCategories(firstCategory: String): [String],
		statThirdCategories(firstCategory: String, secondCategory: String): [String],
		statYears: [Int],
		statData(regionName: String, mainCategory: String, subCategory: String, SubSubCategory: String): StatData,
		regionCoords(regionType: String): [RegionCoords],
	}
`
