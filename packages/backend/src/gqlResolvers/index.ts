import annualStatsYears from './annualStatsYears';
import regionNames from './regionNames';
import annualStatsMainCategoryNames from './annualStatsMainCategoryNames';
import annualStatsSubCategoryNames from './annualStatsSubCategoryNames';
import annualStatsSubSubCategoryNames from './annualStatsSubSubCategoryNames';
import statData from './statData';
import coordsPolygons from './coordsPolygons';
import statRating from './statRating';

const gqlResolvers = {
  Query: {
    regionNames,
    annualStatsYears,
    annualStatsMainCategoryNames,
    annualStatsSubCategoryNames,
    annualStatsSubSubCategoryNames,
    coordsPolygons,
    // statData,
    // statRating,
  },
};

export default gqlResolvers;
