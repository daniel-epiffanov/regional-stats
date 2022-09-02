import {
  createContext, FC, useContext, useState,
} from 'react';
import { StatData } from '../../../../../sharedTypes/gqlQueries';
import useFetchStatData from './useFetchStatData';

type ContextValues = Readonly<{
	statData: Readonly<{
    [key: string]: StatData,
  }> | null
}>

// *** this context must be wrapped
// into Menu Context and PrefetchedValues Context ***


const StatDataContext = createContext<ContextValues>({} as ContextValues);

export const useStatDataContext = () => useContext(StatDataContext);

export const StatDataProvider: FC = ({children}) => {
  const statData = useFetchStatData();

  return (
    <StatDataContext.Provider value={{statData}}
    >
      {children}
    </StatDataContext.Provider>
  );
};
