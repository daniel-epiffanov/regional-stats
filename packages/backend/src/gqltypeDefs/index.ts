import { gql } from 'apollo-server-express';
import fs from 'fs';
import path from 'path';

export default gql`
	${fs.readFileSync(path.join(__dirname, 'annualStats.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'coordsPolygon.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'coordsPoint.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'annualStatsRating.graphql'), 'utf8')}

	input SD {
		year: Int
	}

	type Query {
		regionNames(regionType: String): [String],
		annualStatsYears: [Int],
		annualStatsMainCategoryNames: [String],
		annualStatsSubCategoryNames(mainCategoryName: String): [String],
		annualStats(
			regionType: String,
			mainCategoryName: String,
			subCategoryName: String,
			subSubCategoryName: String
		): [AnnualStatsItem],
		annualStatsSubSubCategoryNames(
			mainCategoryName: String
			subCategoryName: String
		): [String],
		coordsPolygons(regionType: String): [CoordsPolygon],
		coordsPoints(regionType: String): [CoordsPoint],
		annualStatsRating(
			year: Int,
			mainCategoryName: String,
			subCategoryName: String,
			subSubCategoryName: String,
			regionType: String
			): [AnnualStatsRating],
		
	}
	`;
