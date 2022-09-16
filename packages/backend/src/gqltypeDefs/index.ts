import { gql } from 'apollo-server-express';
import fs from 'fs';
import path from 'path';

export default gql`
	${fs.readFileSync(path.join(__dirname, 'statData.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'mapRegionPolygons.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statSubCategories.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statMainCategories.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'statRating.graphql'), 'utf8')}

	input SD {
		year: Int
	}

	type Query {
		annualStatsYears: [Int],
		
		mapRegionPolygons(regionType: String): [MapRegionPolygons],
		mapRegionNames(regionType: String): [String],

		
		statRating(year: Int, mainCategory: String, subCategory: String, subSubCategory: String, regionNames: [String]): [StatRating],
		statRegionNames: [String],
		statFirstCategories: [String],
		statSecondCategories(firstCategory: String): [String],
		statThirdCategories(firstCategory: String, secondCategory: String): [String],
		statData(regionName: String, mainCategory: String, subCategory: String, subSubCategory: String): StatData,
	}
`;
