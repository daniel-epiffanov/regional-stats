import {
  createContext, FC, useContext,
} from 'react';
import { AnnualDataItem, GqlAnnualStats, GqlAnnualStatsItem } from '../../../../../sharedTypes/gqlQueries';
import Message from '../../components/Message';
import useAnnualStatsQuery from './useAnnualStatsQuery';

type ContextValues = Readonly<{
	annualStats: GqlAnnualStats,
  getAnnualStatsItem: GetAnnualStatsItem,
  getRegionFlagUrl: GetRegionFlagUrl,
  getAnnualDataItem: GetAnnualDataItem
}>

type GetRegionFlagUrl = (regionName: string) => string | null
type GetAnnualStatsItem = (regionName: string) => GqlAnnualStatsItem | null
type GetAnnualDataItem = (regionName: string, year: number) => AnnualDataItem | null


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

  if(!curSubCategoryName) {
    return <Message type="info" text="Пожалуйста, выберите подкатегорию." />;
  }
  if(annualStats === 'loading') {
    return <Message type="message" text="Загрузка данных статистики." />;
  }
  if(annualStats === 'error') {
    return <Message type="error" text="Не удалось загрузить данные статистики." />;
  }
  if(!annualStats) {
    return <Message type="info" text={`Раздел <${curSubCategoryName}> имеет подкатегорию. Пожалуйста вернитесь в меню категорий и закончите выбор.`} />;
  }

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
  const getAnnualDataItem: GetAnnualDataItem = (regionName, year) => {
    if(!annualStats) return null;
    const annualStatsItem = getAnnualStatsItem(regionName);
    const annualDataItem =  annualStatsItem?.annualData
      .find(annualDataItem => annualDataItem.year === year) || null;
    return annualDataItem || null;
  };


  return (
    <AnnualStatsContext.Provider value={{
      annualStats,
      getAnnualStatsItem,
      getRegionFlagUrl,
      getAnnualDataItem
    }}
    >
      {children}
    </AnnualStatsContext.Provider>
  );
};
