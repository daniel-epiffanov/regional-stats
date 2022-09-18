import { GqlAnnualStatsYears } from '../../../../../sharedTypes/gqlQueries';
import AnnualStatsOfRegionModel from '../../mongoModels/annualStatsOfRegion';
import { ResolverFnAsync } from '../types/ResolverFn';

const annualStatsYears: ResolverFnAsync<GqlAnnualStatsYears> = async () => {
  const mongoRes = await AnnualStatsOfRegionModel
    .distinct('mainSections.subSections.annualStats.year');
  return mongoRes;
};

export default annualStatsYears;
