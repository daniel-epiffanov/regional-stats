import axios from 'axios';
import { GqlAnnualStatsCategoryNames } from '../../../../sharedTypes/gqlQueries';
import { hostApi } from '../config/host';
import { GraphqlResponse } from './queries';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';


type Response = GraphqlResponse<{
	statFirstCategories: GqlAnnualStatsCategoryNames
}>

const fetchStatFirstCategories = async () => {
  const query = jsonToGraphQLQuery({
    query: {
      statFirstCategories: true
    }
  });

  try {
    const axiosResponse = await axios.post<Response>(hostApi, { query });
    const { data: axiosData } = axiosResponse.data;
    if (!axiosData?.statFirstCategories
			|| axiosData.statFirstCategories.length === 0) return null;

    return axiosData.statFirstCategories;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export default fetchStatFirstCategories;
