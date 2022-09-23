import { gql, useQuery } from '@apollo/client';
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';
import { GqlRegionNames, RegionTypeArg } from '../../../../../sharedTypes/gqlQueries';

type GqlRes = Readonly<{
	regionNames: GqlRegionNames,
}>

const useFetchRegionNames = (regionType: RegionTypeArg) => {
  const query = gql(jsonToGraphQLQuery({
    query: {
      __variables: {
        regionType: 'String!',
      },
      regionNames: {
        __args: {
          regionType: new VariableType('regionType')
        }
      }
    }
  }));

  console.log({query});
  const { loading, error, data } = useQuery<GqlRes>(query, {
    variables: { regionType }
  });
  
  if (loading || error || !data) return null;

  if(!data?.regionNames?.length) return null;

  return data.regionNames;
};

export default useFetchRegionNames;