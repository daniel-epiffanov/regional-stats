import { useQuery, gql } from '@apollo/client';
import { StatRegionNames, GqlRegionCoords, GqlMapRegionNames } from '../../../../../sharedTypes/gqlQueries';

interface QueryResponse {
	mapRegionCoords: GqlRegionCoords,
	statRegionNames: StatRegionNames,
	mapRegionNames: GqlMapRegionNames
}

type ReadonlyQueryResponse = Readonly<QueryResponse>

const useCoordsQuery = () => {
  const QUERY = gql` query {
		mapRegionCoords(regionType: "region") {
			type,
			geometry {
				type,
				coordinates
			},
			properties {
				name_en
				name_ru
			},
			dot
		},
		mapRegionNames(regionType: "region")
	}`;

  const methods = useQuery<ReadonlyQueryResponse>(QUERY);
  const { loading, error, data } = methods;

  if (loading) return null;

  const mapRegionCoords = data?.mapRegionCoords;
  const mapRegionNames = data?.mapRegionNames;

  if (error || !data || !mapRegionCoords || !mapRegionNames) return null;

  return ({mapRegionCoords, mapRegionNames});
};

export default useCoordsQuery;
