import {
  createContext, FC, useContext,
} from 'react';
import { GqlAnnualStats } from '../../../../../sharedTypes/gqlQueries';
import Message from '../../components/Message';
import useAnnualStatsQuery from './useAnnualStatsQuery';

type ContextValues = Readonly<{
	annualStats: GqlAnnualStats,
  // getPrettyValueByYear: GetPrettyValueByYear,
  // getYearValue: GetYearValue,
  // getRegionStatData: GetRegionStatData
}>

// type GetPrettyValueByYear = (regionName: string, year: number) => string | null
// type GetYearValue = (regionName: string, year: number) => GqlStatData['yearValues'][0] | null
// type GetRegionStatData = (regionName: string) => GqlStatData | null

// *** this context must be wrapped
// into Menu Context and PrefetchedValues Context ***


const AnnualStatsContext = createContext<ContextValues>({} as ContextValues);

export const useAnnualStatsContext = () => useContext(AnnualStatsContext);

type ProviderProps = Readonly<{
  regionType: string | null,
  curMainCategoryName: string | null,
  curSubCategoryName: string | null,
  curSubSubCategoryName?: string | null,
}>

export const AnnualStatsProvider: FC<ProviderProps> = (props) => {
  const {
    children,
    regionType,
    curMainCategoryName,
    curSubCategoryName,
    curSubSubCategoryName
  } = props;
  const annualStats = useAnnualStatsQuery(
    regionType,
    curMainCategoryName,
    curSubCategoryName,
    curSubSubCategoryName
  );

  console.log({annualStats});

  // const getPrettyValueByYear: GetPrettyValueByYear = (regionName, year) => {
  //   if(!statData || !statData[regionName]) return null;
  //   const curYearValue = statData[regionName].yearValues
  //     .find(yearValue => yearValue.year === year);
    
  //   return curYearValue?.prettyValue || null;
  // };
  // const getYearValue: GetYearValue = (regionName, year) => {
  //   if(!statData || !statData[regionName]) return null;
  //   const curYearValue = statData[regionName].yearValues
  //     .find(yearValue => yearValue.year === year);
    
  //   return curYearValue || null;
  // };

  // const getRegionStatData: GetRegionStatData = (regionName) => {
  //   if(!statData) return null;
  //   const regionStatData = statData[regionName];
  //   if(!regionStatData) return null;
  //   return regionStatData;
  // };

  if (!annualStats) return <Message type="message" text="Загрузка данных" positionId="vector-map-container" />;

  return (
    <AnnualStatsContext.Provider value={{
      annualStats,
      // getPrettyValueByYear,
      // getYearValue,
      // getRegionStatData
    }}
    >
      {children}
    </AnnualStatsContext.Provider>
  );
};
