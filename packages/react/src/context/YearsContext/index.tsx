import {
  createContext, FC, useContext, useEffect, useState,
} from 'react';
import { GqlAnnualStatsYears } from '../../../../../sharedTypes/gqlQueries';
import Message from '../../components/Message';
import useAnnualStatsYearsQuery from './useAnnualStatsYearsQuery';

type ContextValues = Readonly<{
	years: GqlAnnualStatsYears,
  curYear: number,
  changeCurYear: ChangeCurYear
}>

type ChangeCurYear = (newCurYear: number) => void

const YearsContext = createContext<ContextValues>({} as ContextValues);

export const useYearsContext = () => useContext(YearsContext);

type ProviderProps = Readonly<{
  regionType: string | null,
  curMainCategoryName: string | null,
  curSubCategoryName: string | null,
  curSubSubCategoryName?: string | null,
}>

export const YearsProvider: FC<ProviderProps> = (props) => {
  const {
    children,
    regionType,
    curMainCategoryName,
    curSubCategoryName,
    curSubSubCategoryName
  } = props;

  const years = useAnnualStatsYearsQuery(
    regionType,
    curMainCategoryName,
    curSubCategoryName,
    curSubSubCategoryName
  );
  const [curYear, setCurYear] = useState<number>(2019);
  const changeCurYear: ChangeCurYear = (newCurYear) => {
    setCurYear(newCurYear);
  };

  useEffect(()=> {
    if(Array.isArray(years) && years?.length) {
      console.log(years.at(-1));
      // @ts-ignore
      setCurYear(years.at(-1));
    }
  }, [years]);

  if(years === 'loading') {
    return <Message type="message" text="Загружается информация о годах статистики." />;
  }
  if(years === 'error' || !years) {
    return <Message type="error" text="Не удалось загрузить информацю о годах статистики." />;
  }

  return (
    <YearsContext.Provider value={{
      years,
      curYear,
      changeCurYear
    }}>
      {children}
    </YearsContext.Provider>
  );
};
