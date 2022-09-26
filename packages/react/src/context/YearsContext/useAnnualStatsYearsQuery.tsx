import { gql, useQuery } from '@apollo/client';
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';
import { GqlAnnualStatsYears } from '../../../../../sharedTypes/gqlQueries';

type GqlRes = Readonly<{
	annualStatsYears: GqlAnnualStatsYears,
}>

const useAnnualStatsYearsQuery = (
  regionType: string | null,
  curMainCategoryName: string | null,
  curSubCategoryName: string | null,
  curSubSubCategoryName?: string | null,
) => {
  const query = gql(jsonToGraphQLQuery({
    query: {
      __variables: {
        regionType: 'String!',
        mainCategoryName: 'String!',
        subCategoryName: 'String!',
        subSubCategoryName: 'String',
      },
      annualStatsYears: {
        __args: {
          regionType: new VariableType('regionType'),
          mainCategoryName: new VariableType('mainCategoryName'),
          subCategoryName: new VariableType('subCategoryName'),
          subSubCategoryName: new VariableType('subSubCategoryName'),
        },
      }
    }
  }));

  const { loading, error, data } = useQuery<GqlRes>(query, {
    variables: {
      regionType,
      mainCategoryName: curMainCategoryName,
      subCategoryName: curSubCategoryName,
      subSubCategoryName: curSubSubCategoryName
    }
  });
  
  if(loading) return 'loading';
  if(error) return 'error';
  
  if (!data) return null;

  if(!data?.annualStatsYears?.length) return null;

  return data.annualStatsYears;
};

export default useAnnualStatsYearsQuery;