import axios from 'axios';
import { GqlAnnualStatsCategoryNames } from '../../../../sharedTypes/gqlQueries';
import { hostApi } from '../config/host';
import { GraphqlResponse } from './queries';

type Response = GraphqlResponse<{
  statSecondCategories: GqlAnnualStatsCategoryNames
}>

const fetchStatSecondCategories = async (statFirstCategory: string) => {
  const query = `query {
		statSecondCategories(firstCategory: "${statFirstCategory}")
	}`;

  try {
    const axiosResponse = await axios.post<Response>(hostApi, { query });
    const { data } = axiosResponse.data;
    if (!data?.statSecondCategories
			|| data.statSecondCategories.length === 0) return null;

    return data.statSecondCategories;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export default fetchStatSecondCategories;
