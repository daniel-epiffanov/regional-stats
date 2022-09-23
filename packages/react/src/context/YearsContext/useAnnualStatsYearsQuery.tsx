import { gql, useQuery } from '@apollo/client';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { GqlAnnualStatsYears } from '../../../../../sharedTypes/gqlQueries';

type GqlRes = Readonly<{
	annualStatsYears: GqlAnnualStatsYears,
}>

const useAnnualStatsYearsQuery = () => {
  const query = gql(jsonToGraphQLQuery({
    query: {
      annualStatsYears: true
    }
  }));

  const { loading, error, data } = useQuery<GqlRes>(query);
  
  if (loading || error || !data) return null;

  if(!data?.annualStatsYears?.length) return null;

  return data.annualStatsYears;
};

export default useAnnualStatsYearsQuery;