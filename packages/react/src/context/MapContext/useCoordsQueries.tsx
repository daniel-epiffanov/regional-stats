import { gql, useQuery } from '@apollo/client';
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';
import { GqlCoordsPoints, GqlCoordsPolygons, RegionTypeArg } from '../../../../../sharedTypes/gqlQueries';

type GqlRes = Readonly<{
	coordsPolygons: GqlCoordsPolygons,
	coordsPoints: GqlCoordsPoints,
}>

const useCoordsQueries = (regionType: RegionTypeArg) => {
  const query = gql(jsonToGraphQLQuery({
    query: {
      __variables: {
        regionType: 'String!',
      },
      coordsPolygons: {
        __args: {
          regionType: new VariableType('regionType')
        },
        geometry: {
          type: true,
          coordinates: true
        },
        properties: {
          regionName: true
        }
      },
      coordsPoints: {
        __args: {
          regionType: new VariableType('regionType')
        },
        geometry: {
          type: true,
          coordinates: true
        },
        properties: {
          regionName: true,
          regionFlagUrl: true
        }
      }
    }
  }));

  const { loading, error, data } = useQuery<GqlRes>(query, {
    variables: { regionType }
  });
  
  if (loading || error || !data) return null;

  if(!data?.coordsPolygons?.length) return null;
  if(!data?.coordsPoints?.length) return null;

  return data;
};

export default useCoordsQueries;