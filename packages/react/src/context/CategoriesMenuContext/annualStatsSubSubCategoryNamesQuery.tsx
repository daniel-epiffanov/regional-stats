import axios from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { GqlAnnualStatsCategoryNames } from '../../../../../sharedTypes/gqlQueries';
import { HOST_API } from '../../config/links';

type GqlRes = Readonly<{
	data: {
		annualStatsSubSubCategoryNames: GqlAnnualStatsCategoryNames,
	}
}>

const annualStatsSubSubCategoryNamesQuery = async (
  curMainCategoryName: string,
  newCurSubCategoryName: string,
) => {

  try {
		
    const axiosRes = await axios.post<GqlRes>(`${HOST_API}`, {
      query: jsonToGraphQLQuery({
        query: {
          annualStatsSubSubCategoryNames: {
            __args: {
              mainCategoryName: curMainCategoryName,
              subCategoryName: newCurSubCategoryName
            }
          }
        }
      })
    });

    if(axiosRes.status !== 200) return null;
    const {data: gqlData} = axiosRes;
	
    if(!gqlData || !gqlData?.data?.annualStatsSubSubCategoryNames?.length) return null;
	
    return gqlData?.data?.annualStatsSubSubCategoryNames;
  } catch (error) {
    console.error({error});
    return null;
  }
};

export default annualStatsSubSubCategoryNamesQuery;