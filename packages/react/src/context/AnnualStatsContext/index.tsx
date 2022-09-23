import {
  createContext, FC, useContext,
} from 'react';
import { GqlAnnualStats, GqlAnnualStatsItem } from '../../../../../sharedTypes/gqlQueries';
import Message from '../../components/Message';
import useAnnualStatsQuery from './useAnnualStatsQuery';

type ContextValues = Readonly<{
	annualStats: GqlAnnualStats,
  getAnnualStatsItem: GetAnnualStatsItem,
  getRegionFlagUrl: GetRegionFlagUrl,
}>

// type GetPrettyValueByYear = (regionName: string, year: number) => string | null
// type GetYearValue = (regionName: string, year: number) => GqlStatData['yearValues'][0] | null
// type GetRegionStatData = (regionName: string) => GqlStatData | null

// *** this context must be wrapped
// into Menu Context and PrefetchedValues Context ***

type GetRegionFlagUrl = (regionName: string) => string | null
type GetAnnualStatsItem = (regionName: string) => GqlAnnualStatsItem | null


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

  const getAnnualStatsItem: GetAnnualStatsItem = (regionName) => {
    if(!annualStats) return null;
    const annualStatsItem = annualStats.find(annualStatsItem=>annualStatsItem.regionName === regionName);
    return annualStatsItem || null;
  };

  const getRegionFlagUrl: GetRegionFlagUrl = (regionName) => {
    if(!annualStats) return null;
    const annualStatsItem = getAnnualStatsItem(regionName);
    return annualStatsItem?.regionFlagUrl || null;
  };

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
      getAnnualStatsItem,
      getRegionFlagUrl
    }}
    >
      {children}
    </AnnualStatsContext.Provider>
  );
};
