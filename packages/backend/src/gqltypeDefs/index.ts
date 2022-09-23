import { gql } from 'apollo-server-express';
import fs from 'fs';
import path from 'path';

export default gql`
	${fs.readFileSync(path.join(__dirname, 'annualStats.graphql'), 'utf8')}
	${fs.readFileSync(path.join(__dirname, 'coordsPolygons.graphql'), 'utf8')}
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
		coordsPolygons(regionType: String): [CoordsPolygons],
		annualStatsRating(
			year: Int,
			mainCategoryName: String,
			subCategoryName: String,
			subSubCategoryName: String,
			regionType: String
		): [AnnualStatsRating],
		
	}
	`;

// eslint-disable-next-line max-len
