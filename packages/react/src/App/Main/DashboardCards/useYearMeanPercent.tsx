import { useEffect, useState } from 'react';
import { GqlStatData, StatYearMeanPercents } from '../../../../../../sharedTypes/gqlQueries';
import { useStatDataContext } from '../../../context/StatDataContext';
import fetchStatYearMeanPercents from '../../../queries/fetchStatYearMeanPercents';
import _ from 'lodash';

const useYearMeanPercents = () => {
  const {statData} = useStatDataContext();
  const [yearMeanPercents, setYearMeanPercents] = useState<null | StatYearMeanPercents>(null);
  
  useEffect(()=> {
    const getAllYearValues = () => {
      if(!statData) return [];
      const allYearValuesArr = Object.values(statData).map(statItem=> statItem.yearValues);
      const allYearValues = _.concat(...allYearValuesArr);
      return allYearValues;
    };
    const getQuery = async () => {
      if(!statData) return;
      const yearValuesPercents = await fetchStatYearMeanPercents(getAllYearValues());
      setYearMeanPercents(yearValuesPercents);
    };
    getQuery();
  }, [statData]);
  //   if (!statData) return <p>waiting for data</p>;
  //   console.log({yearValuePercent: yearMeanPercents});

  return yearMeanPercents;
};

export default useYearMeanPercents;