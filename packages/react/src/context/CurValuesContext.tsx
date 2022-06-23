import {
  createContext, FC, useContext, useState,
} from 'react';
import { StatData } from '../../../../sharedTypes/gqlQueries';
import {	MongoRegionCoords } from '../../../../sharedTypes/mongoModels';

interface ContextValues {
	curRegionTypeOnMap: MongoRegionCoords['type'],
	curRegions: string[],
	curStatCategoriesChain: string[],
	curStatData?: Readonly<{
    [key: string]: StatData
	}> | null,

	setCurValues: SetCurValues,
}

type ReadonlyContextValues = Readonly<ContextValues>

type SetCurValues = (newSelections: Partial<ReadonlyStateValues>) => void

type ReadonlyStateValues = Omit<ReadonlyContextValues, 'setCurValues'>

type CurValuesProviderProps = Partial<ReadonlyStateValues>

const CurValuesContext = createContext<ReadonlyContextValues>({} as ReadonlyContextValues);

export const useCurValuesContext = () => useContext(CurValuesContext);

export const CurValuesProvider: FC<CurValuesProviderProps> = (props) => {
  const {
    children,
    curRegionTypeOnMap,
    curRegions,
    curStatCategoriesChain,
    curStatData
  } = props;

	
  const [curValuesAcc, setCurValuesAcc] = useState<ReadonlyStateValues>({
    curRegionTypeOnMap: curRegionTypeOnMap || 'region',
    curRegions: curRegions || [],
    curStatCategoriesChain: curStatCategoriesChain || [],
    curStatData
  });

  const setCurValues: SetCurValues = (newSelections) => {
    setCurValuesAcc(prevSelectionParams => ({ ...prevSelectionParams, ...newSelections }));
  };

  return (
    <CurValuesContext.Provider value={{
      ...curValuesAcc,
      setCurValues,
    }}
    >
      {children}
    </CurValuesContext.Provider>
  );
};
