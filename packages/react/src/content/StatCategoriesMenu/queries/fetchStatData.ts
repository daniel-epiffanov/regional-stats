import axios from 'axios';
import { StatData } from '../../../../../../sharedTypes/gqlQueries';
import { hostApi } from '../../../helpers/host';

type Props = Readonly<{
	regionNames: ReadonlyArray<string>,
	mainCategory: string
	subCategory: string
	subSubCategory?: string
}>

type StatDataResponse = Readonly<{
	readonly data: {
		[key: string]: StatData
	}
}>

const fetchStatData = async (props: Props) => {
  const {
    regionNames,
    mainCategory,
    subCategory,
    subSubCategory,
  } = props;

  const subSectionChildNamePar = subSubCategory ? `subSubCategory: "${subSubCategory}"` : '';

  const statDataQuery = regionNames.map((regionName, i) => `region_${i}: statData (
		regionName: "${regionName}",
		mainCategory: "${mainCategory}",
		subCategory: "${subCategory}",
		${subSectionChildNamePar}
	) {
		name,
    measure,
    parentMeasure,
    yearValues {
      year,
			value
    }
	}`);

  const query = `query{
		${statDataQuery}
	}`;

  const axiosResponse = await axios.post<StatDataResponse>(hostApi, { query });
  const { data } = axiosResponse.data;

  if (!data || Object.entries(data).length === 0) return null;

  const statDataEntries = Object.entries(data)
    .map(([indexedRegionName, statisticsData], i) => {
      const indexOfRegion = parseInt(indexedRegionName.split('_')[1]);
      return [regionNames[indexOfRegion], statisticsData];
    });

  const statData: Readonly<{
    [key: string]: StatData
}> | null = Object.fromEntries(statDataEntries);

  return statData;
};

export default fetchStatData;
