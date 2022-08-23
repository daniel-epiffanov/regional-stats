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

	setMenuValues: SetMenuValues,
}>

type ContextStateValues = Omit<ContextValues, 'setMenuValues'>

type SetMenuValues = (newSelections: Partial<ContextStateValues>) => void


const MenuContext = createContext<ContextValues>({} as ContextValues);

export const useMenuValuesContext = () => useContext(MenuContext);

export const MenuProvider: FC<Partial<ContextStateValues>> = (props) => {
  const {
    children,
    curStatCategories
  } = props;
	
  const [menuValuesAcc, setMenuValuesAcc] = useState<ContextStateValues>({
    curRegionTypeOnMap: 'region',
    curRegions: [],
    curStatCategories: curStatCategories || {},
  });

  const setMenuValues: SetMenuValues = (newSelections) => {
    setMenuValuesAcc(prevSelectionParams => ({ ...prevSelectionParams, ...newSelections }));
  };

  return (
    <MenuContext.Provider value={{
      ...menuValuesAcc,
      setMenuValues,
    }}
    >
      {children}
    </MenuContext.Provider>
  );
};
