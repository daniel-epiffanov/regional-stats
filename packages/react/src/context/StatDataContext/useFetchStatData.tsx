import { useEffect, useState } from 'react';
import { StatData } from '../../../../../sharedTypes/gqlQueries';
import { useMenuContext } from '../MenuContext';
import { usePrefetchedValuesContext } from '../PrefetchedValuesContext';
import fetchStatData from './fetchStatData';


const useFetchStatData= () => {
  const { statRegionNames } = usePrefetchedValuesContext();
  const { curStatCategories } = useMenuContext();
  const [
    stateData, setStatData
  ] = useState<Readonly<{ [key: string]: StatData}> | null>(null);

  useEffect(() => {
    const fetchAndSaveStatData = async () => {
      if (!curStatCategories.secondCategory) return;

      const curStatData = await fetchStatData({
        regionNames: statRegionNames,
        mainCategory: curStatCategories.firstCategory || '',
        subCategory: curStatCategories.secondCategory,
        subSubCategory: curStatCategories.thirdCategory || '',
      });

      // console.log({curStatData});

      if (!curStatData) return;
      setStatData(curStatData);
    };

    if(curStatCategories.secondCategory) {
      fetchAndSaveStatData();
    }

  }, [statRegionNames, curStatCategories.firstCategory, curStatCategories.secondCategory, curStatCategories.thirdCategory]);

  return stateData;
};

export default useFetchStatData;
