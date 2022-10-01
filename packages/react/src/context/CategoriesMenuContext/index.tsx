import {
  createContext, FC, useContext, useEffect, useState,
} from 'react';
import { useLocalStorage } from 'react-use';
import { GqlAnnualStatsCategoryNames } from '../../../../../sharedTypes/gqlQueries';
import annualStatsSubSubCategoryNamesQuery from './annualStatsSubSubCategoryNamesQuery';
import useAnnualStatsMainCategoryNames from './useAnnualStatsMainCategoryNames';
import useAnnualStatsSubCategoryNames from './useAnnualStatsSubCategoryNames';

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

type ChangeCurMainCategoryName = (newCurMainCategoryName: string) => void
type ChangeCurSubCategoryName = (newCurSubCategoryName: string) => Promise<null | GqlAnnualStatsCategoryNames>
type ChangeCurSubSubCategoryName = (newCurSubSubCategoryName: string) => void

type ProviderProps = Omit<ContextValues, 'changeCurMainCategoryName' | 
  'changeCurSubCategoryName' |
  'changeCurSubSubCategoryName'>


const CategoriesMenuContext = createContext<ContextValues>({} as ContextValues);

export const useCategoriesMenuContext = () => useContext(CategoriesMenuContext);

export const CategoriesMenuProvider: FC<Partial<ProviderProps>> = (props) => {
  const {
    children,
    curCategoryNames: defaultCurCategoryNames
  } = props;

  const [curLocStCategoryNames, setCurLocStCategoryNames] = useLocalStorage<CurCategoryNames | null>(
    'curCategoryNames',
    null
  );

  const [curCategoryNames, setCurCategoryName] = useState<CurCategoryNames>(
    defaultCurCategoryNames || curLocStCategoryNames || {
      curMainCategoryName: null,
      curSubCategoryName: null,
      curSubSubCategoryName: null
    });

  useEffect(()=> {
    setCurLocStCategoryNames(curCategoryNames);
  }, [curCategoryNames]);

  const {curMainCategoryName} = curCategoryNames;

  const mainCategoryNames = useAnnualStatsMainCategoryNames();
  const subCategoryNames = useAnnualStatsSubCategoryNames(curMainCategoryName);
  // const subSubCategoryNames = useAnnualStatsSubSubCategoryNames(
  //   curMainCategoryName, curSubCategoryName
  // );
  const [subSubCategoryNames, setSubSubCategoryNames] = useState<GqlAnnualStatsCategoryNames | null>(null);
	

  const changeCurMainCategoryName: ChangeCurMainCategoryName = (newCurMainCategoryName) => {
    setSubSubCategoryNames(null);
    setCurCategoryName({
      curMainCategoryName: newCurMainCategoryName,
      curSubCategoryName: null,
      curSubSubCategoryName: null
    });
  };
  const changeCurSubCategoryName: ChangeCurSubCategoryName = async (newCurSubCategoryName) => {
    setSubSubCategoryNames(null);
    setCurCategoryName(oldCurCategoryNames => ({
      curMainCategoryName: oldCurCategoryNames.curMainCategoryName,
      curSubCategoryName: newCurSubCategoryName,
      curSubSubCategoryName: null
    }));
		
    if(!curMainCategoryName) return null;
		
    const newAnnualStatsSubSubCategoryNames = await annualStatsSubSubCategoryNamesQuery(
      curMainCategoryName, newCurSubCategoryName
    );

    setSubSubCategoryNames(newAnnualStatsSubSubCategoryNames);

    return newAnnualStatsSubSubCategoryNames;

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
