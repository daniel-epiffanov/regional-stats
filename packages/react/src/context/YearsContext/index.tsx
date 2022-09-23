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
  const [curYear, setCurYeat] = useState<number>(2019);
  const changeCurYear: ChangeCurYear = (newCurYear) => {
    setCurYeat(newCurYear);
  };

  if (!years) return <Message type="message" text="Не удалось загрузить информацю о годах статистики" />;

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
