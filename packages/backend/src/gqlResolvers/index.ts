import annualStatsYears from './annualStatsYears';
import regionNames from './regionNames';
import statFirstCategories from './statFirstCategories';
import statSecondCategories from './statSecondCategories';
import statThirdCategories from './statThirdCategories';
import statData from './statData';
import mapRegionPolygons from './mapRegionPolygons';
import statRating from './statRating';

const gqlResolvers = {
  Query: {
    regionNames,
    annualStatsYears,
    // statFirstCategories,
    // statSecondCategories,
    // statThirdCategories,
    // statData,
    // mapRegionPolygons,
    // statRating,
  },
};

export default gqlResolvers;
