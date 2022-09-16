import { GqlAnnualStatsYears } from '../../../../../sharedTypes/gqlQueries';
import statisticsModel from '../../mongoModels/annualStatsOfRegion';
import { ResolverFnAsync } from '../types/ResolverFn';

const annualStatsYears: ResolverFnAsync<GqlAnnualStatsYears> = async (
  parent: any,
  args: any,
) => {
  const mongoRes = await statisticsModel.distinct('mainSections.subSections.annualStats.year');
  return mongoRes;
};

export default annualStatsYears;
