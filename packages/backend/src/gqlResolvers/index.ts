import annualStatsYears from './annualStatsYears';
import regionNames from './regionNames';
import annualStatsMainCategoryNames from './annualStatsMainCategoryNames';
import annualStatsSubCategoryNames from './annualStatsSubCategoryNames';
import annualStatsSubSubCategoryNames from './annualStatsSubSubCategoryNames';
import annualStats from './annualStats';
import coordsPolygons from './coordsPolygons';
import annualStatsRating from './annualStatsRating';

const gqlResolvers = {
  Query: {
    regionNames,
    annualStatsYears,
    annualStatsMainCategoryNames,
    annualStatsSubCategoryNames,
    annualStatsSubSubCategoryNames,
    coordsPolygons,
    annualStats,
    annualStatsRating,
  },
};

export default gqlResolvers;
