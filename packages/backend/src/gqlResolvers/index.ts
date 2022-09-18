import annualStatsYears from './annualStatsYears';
import regionNames from './regionNames';
import annualStatsMainCategoryNames from './annualStatsMainCategoryNames';
import annualStatsSubCategoryNames from './annualStatsSubCategoryNames';
import statThirdCategories from './statThirdCategories';
import statData from './statData';
import mapRegionPolygons from './mapRegionPolygons';
import statRating from './statRating';

const gqlResolvers = {
  Query: {
    regionNames,
    annualStatsYears,
    annualStatsMainCategoryNames,
    annualStatsSubCategoryNames,
    // statThirdCategories,
    // statData,
    // mapRegionPolygons,
    // statRating,
  },
};

export default gqlResolvers;
