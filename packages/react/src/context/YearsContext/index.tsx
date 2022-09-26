import {
  createContext, FC, useContext, useState,
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

export const YearsProvider: FC = ({ children }) => {
  const years = useAnnualStatsYearsQuery();
  const [curYear, setCurYear] = useState<number>(2019);
  const changeCurYear: ChangeCurYear = (newCurYear) => {
    setCurYear(newCurYear);
  };

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
