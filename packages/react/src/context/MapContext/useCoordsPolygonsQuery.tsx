import { gql, useQuery } from '@apollo/client';
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';
import { GqlCoordsPolygons, RegionTypeArg } from '../../../../../sharedTypes/gqlQueries';

type GqlRes = Readonly<{
	coordsPolygons: GqlCoordsPolygons,
}>

const useCoordsPolygonsQuery = (regionType: RegionTypeArg) => {
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
      }
    }
  }));

  const { loading, error, data } = useQuery<GqlRes>(query, {
    variables: { regionType }
  });
  
  if (loading || error || !data) return null;

  if(!data?.coordsPolygons?.length) return null;

  return data.coordsPolygons;
};

export default useCoordsPolygonsQuery;