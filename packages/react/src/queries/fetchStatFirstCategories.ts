import axios from 'axios';
import { StatCategories } from '../../../../sharedTypes/gqlQueries';
import { hostApi } from '../helpers/host';
import { GraphqlResponse } from './queries';

type Response = GraphqlResponse<{
	statFirstCategories: StatCategories
}>

const fetchStatFirstCategories = async () => {
  const query = `query {
		statFirstCategories
	}`;

  try {
    const axiosResponse = await axios.post<Response>(hostApi, { query });
    const { data } = axiosResponse.data;
    if (!data?.statFirstCategories
			|| data.statFirstCategories.length === 0) return null;

    return data.statFirstCategories;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export default fetchStatFirstCategories;
