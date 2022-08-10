import {
  createContext, FC, useContext, useState,
} from 'react';
import {	MongoRegionCoords } from '../../../../sharedTypes/mongoModels';

type StatCategories = Readonly<{
  firstCategory?: string | null,
  secondCategory?: string | null,
  thirdCategory?: string | null,
}>

type ContextValues = Readonly<{
	curRegionTypeOnMap: MongoRegionCoords['type'],
	curRegions: string[],
	curStatCategories: StatCategories,

	setCurMenuValues: SetCurMenuValues,
}>

type SetCurMenuValues = (newSelections: Partial<Omit<ContextValues, 'setCurMenuValues'>>) => void


const CurValuesContext = createContext<ContextValues>({} as ContextValues);

export const useCurMenuValuesContext = () => useContext(CurValuesContext);

export const CurMenuValuesProvider: FC = ({children}) => {
	
  const [curMenuValuesAcc, setCurMenuValuesAcc] = useState<Omit<ContextValues, 'setCurMenuValues'>>({
    curRegionTypeOnMap: 'region',
    curRegions: [],
    curStatCategories: {},
  });

  const setCurMenuValues: SetCurMenuValues = (newSelections) => {
    setCurMenuValuesAcc(prevSelectionParams => ({ ...prevSelectionParams, ...newSelections }));
  };

  return (
    <CurValuesContext.Provider value={{
      ...curMenuValuesAcc,
      setCurMenuValues,
    }}
    >
      {children}
    </CurValuesContext.Provider>
  );
};
