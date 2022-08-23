import { useEffect, useState } from 'react';
import { StatData } from '../../../../../sharedTypes/gqlQueries';
import { useMenuValuesContext } from '../MenuContext';
import fetchStatData from './fetchStatData';


const useFetchStatData= () => {
  // const { statRegionNames } = usePrefetchedValuesContext();
  const { curStatCategories } = useMenuValuesContext();
  const [
    stateData, setStatData
  ] = useState<Readonly<{ [key: string]: StatData}> | null>(null);

  useEffect(() => {
    const fetchAndSaveStatData = async () => {
      if (!curStatCategories.secondCategory) return;

      const curStatData = await fetchStatData({
        regionNames: ['Рязанская область', 'Тульская область', 'Тверская область'],
        mainCategory: curStatCategories.firstCategory || '',
        subCategory: curStatCategories.secondCategory,
        subSubCategory: curStatCategories.thirdCategory || '',
      });

      if (!curStatData) return;
      setStatData(curStatData);
    };

    if(curStatCategories.secondCategory) {
      fetchAndSaveStatData();
    }

  }, [curStatCategories.firstCategory, curStatCategories.secondCategory, curStatCategories.thirdCategory]);

  return stateData;
};

export default useFetchStatData;
