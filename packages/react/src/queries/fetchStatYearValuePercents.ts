import axios from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { StatData, StatYearValuePercents } from '../../../../sharedTypes/gqlQueries';
import { hostApi } from '../helpers/host';
import { GraphqlResponse } from './queries';

type Response = GraphqlResponse<{
  statYearValuePercents: StatYearValuePercents
}>

const getStatYearValuePercents = async (yearValues: StatData['yearValues']) => {
  const query = jsonToGraphQLQuery({
    query: {
      statYearValuePercents: {
        __args: {
          yearValues
        },
        percent: true,
        year: true,
        value: true
      }
    }
  }, { pretty: true });
    
  try {
    const axiosResponse = await axios.post<Response>(hostApi, { query });
    const { data } = axiosResponse.data;
  
    console.log({data});
    if (!data?.statYearValuePercents
          || data.statYearValuePercents.length === 0) return null;
    
    return data.statYearValuePercents;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export default getStatYearValuePercents;