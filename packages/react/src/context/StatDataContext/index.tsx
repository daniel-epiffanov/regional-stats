import {
  createContext, FC, useContext, useState,
} from 'react';
import { GqlStatData } from '../../../../../sharedTypes/gqlQueries';
import useFetchStatData from './useFetchStatData';

type ContextValues = Readonly<{
	statData: Readonly<{
    [key: string]: GqlStatData,
  }> | null,
  getPrettyValueByYear: GetPrettyValueByYear,
  getYearValue: GetYearValue,
}>

type GetPrettyValueByYear = (regionName: string, year: number) => string | null
type GetYearValue = (regionName: string, year: number) => GqlStatData['yearValues'][0] | null

// *** this context must be wrapped
// into Menu Context and PrefetchedValues Context ***


const StatDataContext = createContext<ContextValues>({} as ContextValues);

export const useStatDataContext = () => useContext(StatDataContext);

export const StatDataProvider: FC = ({children}) => {
  const statData = useFetchStatData();

  const getPrettyValueByYear: GetPrettyValueByYear = (regionName, year) => {
    if(!statData || !statData[regionName]) return null;
    const curYearValue = statData[regionName].yearValues
      .find(yearValue => yearValue.year === year);
    
    return curYearValue?.prettyValue || null;
  };
  const getYearValue: GetYearValue = (regionName, year) => {
    if(!statData || !statData[regionName]) return null;
    const curYearValue = statData[regionName].yearValues
      .find(yearValue => yearValue.year === year);
    
    return curYearValue || null;
  };

  return (
    <StatDataContext.Provider value={{statData, getPrettyValueByYear, getYearValue}}
    >
      {children}
    </StatDataContext.Provider>
  );
};
