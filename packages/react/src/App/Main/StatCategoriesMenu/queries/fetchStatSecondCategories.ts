import axios from 'axios';
import { StatCategories } from '../../../../../../../sharedTypes/gqlQueries';
import { hostApi } from '../../../../helpers/host';

type StatSecondCategoriesDataResponse = Readonly<{
	data: {
		statSecondCategories: StatCategories
	}
}>

const fetchStatSecondCategories = async (statFirstCategory: string) => {
  const query = `query {
		statSecondCategories(firstCategory: "${statFirstCategory}")
	}`;

  try {
    const axiosResponse = await axios.post<StatSecondCategoriesDataResponse>(hostApi, { query });
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
