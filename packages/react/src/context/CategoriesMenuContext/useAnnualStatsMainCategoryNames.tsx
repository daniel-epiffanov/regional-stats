import { gql, useQuery } from '@apollo/client';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { GqlAnnualStatsCategoryNames } from '../../../../../sharedTypes/gqlQueries';

type GqlRes = Readonly<{
	annualStatsMainCategoryNames: GqlAnnualStatsCategoryNames,
}>

const useAnnualStatsMainCategoryNames = () => {
  const query = gql(jsonToGraphQLQuery({
    query: {
      annualStatsMainCategoryNames: true
    }
  }));

  const { loading, error, data } = useQuery<GqlRes>(query);
  
  if (loading || error || !data) return null;

  if(!data?.annualStatsMainCategoryNames?.length) return null;

  return data.annualStatsMainCategoryNames;
};

export default useAnnualStatsMainCategoryNames;