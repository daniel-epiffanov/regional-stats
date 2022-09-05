import { useEffect, useState } from 'react';
import { GqlStatData } from '../../../../../sharedTypes/gqlQueries';
import { useStatDataContext } from '.';

const useYearValue = (regionName: string, year: number) => {
  const {statData, getYearValue} = useStatDataContext();
  const [data, setData] = useState<GqlStatData['yearValues'][0] | null>(null);

  useEffect(() => {
    if(!year || !statData) return;
    const yearValue = getYearValue(regionName, year);
    if(!yearValue) return;
    setData(yearValue);
  }, [statData, year]);

  return data;
};

export default useYearValue;