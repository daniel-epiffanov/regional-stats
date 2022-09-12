import {
  createContext, FC, useContext,
} from 'react';
import { GqlStatData } from '../../../../../sharedTypes/gqlQueries';
import useFetchStatData from './useFetchStatData';

type ContextValues = Readonly<{
	statData: Readonly<{
    [key: string]: GqlStatData,
  }> | null,
  getPrettyValueByYear: GetPrettyValueByYear,
  getYearValue: GetYearValue,
  getRegionStatData: GetRegionStatData
}>

type GetPrettyValueByYear = (regionName: string, year: number) => string | null
type GetYearValue = (regionName: string, year: number) => GqlStatData['yearValues'][0] | null
type GetRegionStatData = (regionName: string) => GqlStatData | null

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

  const getRegionStatData: GetRegionStatData = (regionName) => {
    if(!statData) return null;
    const regionStatData = statData[regionName];
    if(!regionStatData) return null;
    return regionStatData;
  };

  return (
    <StatDataContext.Provider value={{
      statData,
      getPrettyValueByYear,
      getYearValue,
      getRegionStatData
    }}
    >
      {children}
    </StatDataContext.Provider>
  );
};
