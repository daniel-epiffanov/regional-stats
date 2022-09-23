import {
  createContext, FC, useContext, useState,
} from 'react';
import { GqlAnnualStatsCategoryNames } from '../../../../../sharedTypes/gqlQueries';
import useFetchAnnualStatsMainCategoryNames from './useFetchAnnualStatsMainCategoryNames';
import useFetchAnnualStatsSubCategoryNames from './useFetchAnnualStatsSubCategoryNames';
import useFetchAnnualStatsSubSubCategoryNames from './useFetchAnnualStatsSubSubCategoryNames';

type CurCategoryNames = Readonly<{
  curMainCategoryName: string | null,
  curSubCategoryName: string | null,
  curSubSubCategoryName: string | null,
}>

type ContextValues = Readonly<{
  curCategoryNames: CurCategoryNames,

  changeCurMainCategoryName: ChangeCurMainCategoryName,
  changeCurSubCategoryName: ChangeCurSubCategoryName,
  changeCurSubSubCategoryName: ChangeCurSubSubCategoryName,

  mainCategoryNames: GqlAnnualStatsCategoryNames | null,
  subCategoryNames: GqlAnnualStatsCategoryNames | null,
  subSubCategoryNames: GqlAnnualStatsCategoryNames | null,
}>

type ContextStateValues = Omit<ContextValues, 'changeCurMainCategoryName' | 
  'changeCurSubCategoryName' |
  'changeCurSubSubCategoryName'>

type ChangeCurMainCategoryName = (newCurMainCategoryName: string) => void
type ChangeCurSubCategoryName = (newCurSubCategoryName: string) => void
type ChangeCurSubSubCategoryName = (newCurSubSubCategoryName: string) => void


const CategoriesMenuContext = createContext<ContextValues>({} as ContextValues);

export const useCategoriesMenuContext = () => useContext(CategoriesMenuContext);

export const CategoriesMenuProvider: FC<Partial<ContextStateValues>> = (props) => {
  const {
    children,
    curCategoryNames: defaultCurCategoryNames
  } = props;

  const [curCategoryNames, setCurCategoryName] = useState<CurCategoryNames>(
    defaultCurCategoryNames || {
      curMainCategoryName: null,
      curSubCategoryName: null,
      curSubSubCategoryName: null
    });

  const {curMainCategoryName, curSubCategoryName} = curCategoryNames;

  const mainCategoryNames = useFetchAnnualStatsMainCategoryNames();
  const subCategoryNames = useFetchAnnualStatsSubCategoryNames(curMainCategoryName);
  const subSubCategoryNames = useFetchAnnualStatsSubSubCategoryNames(
    curMainCategoryName, curSubCategoryName
  );
	

  const changeCurMainCategoryName: ChangeCurMainCategoryName = (newCurMainCategoryName) => {
    setCurCategoryName({
      curMainCategoryName: newCurMainCategoryName,
      curSubCategoryName: null,
      curSubSubCategoryName: null
    });
  };
  const changeCurSubCategoryName: ChangeCurSubCategoryName = (newCurSubCategoryName) => {
    setCurCategoryName(oldCurCategoryNames => ({
      curMainCategoryName: oldCurCategoryNames.curMainCategoryName,
      curSubCategoryName: newCurSubCategoryName,
      curSubSubCategoryName: null
    }));
  };
  const changeCurSubSubCategoryName: ChangeCurSubSubCategoryName = (newCurSubSubCategoryName) => {
    setCurCategoryName(oldCurCategoryNames => ({
      curMainCategoryName: oldCurCategoryNames.curMainCategoryName,
      curSubCategoryName: oldCurCategoryNames.curSubCategoryName,
      curSubSubCategoryName: newCurSubSubCategoryName
    }));
  };

  return (
    <CategoriesMenuContext.Provider value={{
      curCategoryNames,

      mainCategoryNames,
      subCategoryNames,
      subSubCategoryNames,

      changeCurMainCategoryName,
      changeCurSubCategoryName,
      changeCurSubSubCategoryName
    }}
    >
      {children}
    </CategoriesMenuContext.Provider>
  );
};
