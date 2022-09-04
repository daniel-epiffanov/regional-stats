import axios from 'axios';
import { StatCategories } from '../../../../sharedTypes/gqlQueries';
import { hostApi } from '../config/host';
import { GraphqlResponse } from './queries';

type Response = GraphqlResponse<{
  statThirdCategories: StatCategories
}>

const fetchStatThirdCategories = async (statFirstCategory: string, statSecondCategory: string) => {
  const query = `query {
		statThirdCategories(firstCategory: "${statFirstCategory}", secondCategory: "${statSecondCategory}")
	}`;

  try {
    const axiosResponse = await axios.post<Response>(hostApi, { query });
    const { data } = axiosResponse.data;
    if (!data?.statThirdCategories
			|| data.statThirdCategories.length === 0) return null;

    return data.statThirdCategories;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export default fetchStatThirdCategories;
