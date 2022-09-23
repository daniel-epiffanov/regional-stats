import { gql, useQuery } from '@apollo/client';
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';
import { GqlAnnualStatsCategoryNames } from '../../../../../sharedTypes/gqlQueries';

type GqlRes = Readonly<{
	annualStatsSubCategoryNames: GqlAnnualStatsCategoryNames,
}>

const useFetchAnnualStatsSubCategoryNames = (mainCategoryName: string | null) => {
  const query = gql(jsonToGraphQLQuery({
    query: {
      __variables: {
        mainCategoryName: 'String!',
      },
      annualStatsSubCategoryNames: {
        __args: {
          mainCategoryName: new VariableType('mainCategoryName')
        }
      }
    }
  }));

  const { loading, error, data } = useQuery<GqlRes>(query, {
    variables: { mainCategoryName }
  });
  
  if (loading || error || !data) return null;

  if(!data?.annualStatsSubCategoryNames?.length) return null;

  return data.annualStatsSubCategoryNames;
};

export default useFetchAnnualStatsSubCategoryNames;