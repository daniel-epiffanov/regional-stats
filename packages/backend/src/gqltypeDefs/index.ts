import { gql } from 'apollo-server-express'
import fs from 'fs'
import path from 'path'

export default gql`
	${fs.readFileSync(path.join(__dirname, 'statData.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'mapRegionCoords.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statSubCategories.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statMainCategories.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statYearValuePercents.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statYearMeanPercents.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statRating.graphql'), 'utf8')}

	input SD {
		year: Int
	}

	type Query {
		statRating(year: Int, mainCategory: String, subCategory: String, subSubCategory: String, regionNames: [String]): [StatRating],
		statYearMeanPercents(yearValues: [YearValueInput]): [StatYearMeanPercent],
		statYearValuePercents(yearValues: [YearValueInput]): [StatYearValuePercent],
		statRegionNames: [String],
		statFirstCategories: [String],
		statSecondCategories(firstCategory: String): [String],
		statThirdCategories(firstCategory: String, secondCategory: String): [String],
		statYears: [Int],
		statData(regionName: String, mainCategory: String, subCategory: String, subSubCategory: String): StatData,
		mapRegionCoords(regionType: String): [MapRegionCoords],
		mapRegionNames(regionType: String): [String],
	}
`
