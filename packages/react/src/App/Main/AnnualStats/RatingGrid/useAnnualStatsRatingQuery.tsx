import { gql, useQuery } from '@apollo/client';
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';
import { GqlAnnualStatsRating, RegionTypeArg } from '../../../../../../../sharedTypes/gqlQueries';

type GqlRes = Readonly<{
	annualStatsRating: GqlAnnualStatsRating,
}>

const useAnnualStatsRatingQuery = (
  regionType: RegionTypeArg,
  year: number,
  mainCategoryName: string | null,
  subCategoryName: string | null,
  subSubCategoryName: string | null,
) => {
  const query = gql(jsonToGraphQLQuery({
    query: {
      __variables: {
        regionType: 'String!',
        year: 'Int!',
        mainCategoryName: 'String!',
        subCategoryName: 'String!',
        subSubCategoryName: 'String',
      },
      annualStatsRating: {
        __args: {
          year: new VariableType('year'),
          mainCategoryName: new VariableType('mainCategoryName'),
          subCategoryName: new VariableType('subCategoryName'),
          subSubCategoryName: new VariableType('subSubCategoryName'),
          regionType: new VariableType('regionType')
        },
        regionName: true,
        regionRank: true,
        regionFlagUrl: true,
        value: true,
        prettyValue: true,
        paletteColor: true,
      }
    }
  }));

  const { loading, error, data } = useQuery<GqlRes>(query, {
    variables: {
      regionType,
      year,
      mainCategoryName,
      subCategoryName,
      subSubCategoryName
    }
  });
  
  if(loading) return 'loading';
  if(error) return 'error';
  
  if (!data) return null;

  if(!data?.annualStatsRating?.length) return null;

  return data.annualStatsRating;
};

export default useAnnualStatsRatingQuery;