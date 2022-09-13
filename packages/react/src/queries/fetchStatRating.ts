import axios from 'axios';
import { GqlStatRating } from '../../../../sharedTypes/gqlQueries';
import { hostApi } from '../config/host';
import { GraphqlResponse } from './queries';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';

type Response = GraphqlResponse<{
	statRating: ReadonlyArray<GqlStatRating>
}>

type FetchStatRating = (args: Readonly<{
  year: number,
  mainCategory: string,
  subCategory: string,
  subSubCategory?: string | null,
  regionNames: ReadonlyArray<string>
}>) => Promise<ReadonlyArray<GqlStatRating> | null>

const fetchStatRating: FetchStatRating = async (args) => {
  const {
    year,
    mainCategory,
    subCategory,
    subSubCategory,
    regionNames
  } = args;
  const query = jsonToGraphQLQuery({
    query: {
      statRating: {
        __args: {
          year,
          mainCategory,
          subCategory,
          subSubCategory,
          regionNames
        },
        value: true,
        place: true,
        regionName: true,
        flag: true,
        prettyValue: true
      }
    }
  }, { pretty: true });

  try {
    const axiosResponse = await axios.post<Response>(hostApi, { query });
    const { data } = axiosResponse.data;
    if (!data?.statRating
			|| data.statRating.length === 0) return null;

    return data.statRating;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export default fetchStatRating;
