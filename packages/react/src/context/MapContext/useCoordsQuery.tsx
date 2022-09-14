import { useQuery, gql } from '@apollo/client';
import { StatRegionNames, GqlMapRegionPolygons, GqlMapRegionNames } from '../../../../../sharedTypes/gqlQueries';

interface QueryResponse {
	mapRegionPolygons: GqlMapRegionPolygons,
	statRegionNames: StatRegionNames,
	mapRegionNames: GqlMapRegionNames
}

type ReadonlyQueryResponse = Readonly<QueryResponse>

const useCoordsQuery = () => {
  const QUERY = gql` query {
		mapRegionPolygons(regionType: "region") {
			geometry {
				type,
				coordinates
			},
			properties {
				name
			}
		},
		mapRegionNames(regionType: "region")
	}`;

  const methods = useQuery<ReadonlyQueryResponse>(QUERY);
  const { loading, error, data } = methods;

  if (loading) return null;

  const mapRegionPolygons = data?.mapRegionPolygons;
  const mapRegionNames = data?.mapRegionNames;

  if (error || !data || !mapRegionPolygons || !mapRegionNames) return null;

  return ({mapRegionPolygons, mapRegionNames});
};

export default useCoordsQuery;
