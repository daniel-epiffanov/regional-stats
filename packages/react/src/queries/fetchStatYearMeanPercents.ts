import axios from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { StatData, StatYearMeanPercents } from '../../../../sharedTypes/gqlQueries';
import { hostApi } from '../helpers/host';
import { GraphqlResponse } from './queries';

type Response = GraphqlResponse<{
  statYearMeanPercents: StatYearMeanPercents
}>

const fetchStatYearMeanPercents = async (yearValues: StatData['yearValues']) => {
  const query = jsonToGraphQLQuery({
    query: {
      statYearMeanPercents: {
        __args: {
          yearValues
        },
        percent: true,
        year: true,
        mean: true
      }
    }
  }, { pretty: true });
    
  try {
    const axiosResponse = await axios.post<Response>(hostApi, { query });
    const { data } = axiosResponse.data;
  
    console.log({data});
    if (!data?.statYearMeanPercents
          || data.statYearMeanPercents.length === 0) return null;
    
    return data.statYearMeanPercents;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export default fetchStatYearMeanPercents;