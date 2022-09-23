import { gql, useQuery } from '@apollo/client';
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';
import { GqlAnnualStatsCategoryNames } from '../../../../../sharedTypes/gqlQueries';

type GqlRes = Readonly<{
	annualStatsSubSubCategoryNames: GqlAnnualStatsCategoryNames,
}>

const useAnnualStatsSubSubCategoryNames = (
  mainCategoryName: string | null,
  subCategoryName: string | null,
) => {
  const query = gql(jsonToGraphQLQuery({
    query: {
      __variables: {
        mainCategoryName: 'String!',
        subCategoryName: 'String!'
      },
      annualStatsSubSubCategoryNames: {
        __args: {
          mainCategoryName: new VariableType('mainCategoryName'),
          subCategoryName: new VariableType('subCategoryName')
        }
      }
    }
  }));

  const { loading, error, data } = useQuery<GqlRes>(query, {
    variables: { mainCategoryName, subCategoryName }
  });
  
  if (loading || error || !data) return null;

  if(!data?.annualStatsSubSubCategoryNames?.length) return null;

  return data.annualStatsSubSubCategoryNames;
};

export default useAnnualStatsSubSubCategoryNames;