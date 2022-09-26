import { GqlAnnualStats } from '../../../../../sharedTypes/gqlQueries';
import { gql, useQuery } from '@apollo/client';
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';

type GqlRes = Readonly<{
	annualStats: GqlAnnualStats,
}>

const useAnnualStatsQuery = (
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
      annualStats: {
        __args: {
          regionType: new VariableType('regionType'),
          mainCategoryName: new VariableType('mainCategoryName'),
          subCategoryName: new VariableType('subCategoryName'),
          subSubCategoryName: new VariableType('subSubCategoryName'),
        },
        regionName: true,
        regionFlagUrl: true,
        measure: true,
        parentMeasure: true,
        annualData: {
          year: true,
          value: true,
          prettyValue: true,
          annualGrowthPercent: true,
          totalGrowthPercent: true,
          regionRank: true,
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

  console.log({data});
  
  if (!data) return null;

  if(!data?.annualStats?.length) return null;

  return data.annualStats;
};

export default useAnnualStatsQuery;