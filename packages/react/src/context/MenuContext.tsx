import {
  createContext, FC, useContext, useState,
} from 'react';

type StatCategories = Readonly<{
  firstCategory?: string | null,
  secondCategory?: string | null,
  thirdCategory?: string | null,
}>

type ContextValues = Readonly<{
	curStatCategories: StatCategories,

	changeMenuValues: ChangeMenuValues,
}>

type ContextStateValues = Omit<ContextValues, 'changeMenuValues'>

type ChangeMenuValues = (newSelections: Partial<ContextStateValues>) => void


const MenuContext = createContext<ContextValues>({} as ContextValues);

export const useMenuContext = () => useContext(MenuContext);

export const MenuProvider: FC<Partial<ContextStateValues>> = (props) => {
  const {
    children,
    curStatCategories
  } = props;
	
  const [menuValuesAcc, setMenuValuesAcc] = useState<ContextStateValues>({
    curStatCategories: curStatCategories || {},
  });

  const changeMenuValues: ChangeMenuValues = (newSelections) => {
    setMenuValuesAcc(prevSelectionParams => ({ ...prevSelectionParams, ...newSelections }));
  };

  return (
    <MenuContext.Provider value={{
      ...menuValuesAcc,
      changeMenuValues,
    }}
    >
      {children}
    </MenuContext.Provider>
  );
};
