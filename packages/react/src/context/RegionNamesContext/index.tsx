import {
  createContext, FC, useContext, useState,
} from 'react';
import { GqlRegionNames, RegionTypeArg } from '../../../../../sharedTypes/gqlQueries';

type ContextValues = Readonly<{
	regionType: RegionTypeArg,
  changeRegionType: ChangeRegionType,
  // regionNames: GqlRegionNames,

  curRegionNames: GqlRegionNames,
  changeCurRegionNames: ChangeCurRegionNames,
  addCurRegionNames: AddCurRegionName
}>

type ChangeRegionType = (newRegionType: RegionTypeArg) => void
type ChangeCurRegionNames = (newCurRegionNames: GqlRegionNames) => void
type AddCurRegionName = (newCurRegion: string) => void

const RegionNamesContext = createContext<ContextValues>({} as ContextValues);

export const useRegionNamesContext = () => useContext(RegionNamesContext);

export const RegionNamesProvider: FC = ({ children }) => {
  const [regionType, setRegionType] = useState<RegionTypeArg>('federalDistrict');
  const [curRegionNames, setCurRegionNames] = useState<GqlRegionNames>([]);

  // const regionNames = useRegionNamesQuery(regionType);

  const changeRegionType: ChangeRegionType = (newRegionType) => {
    setRegionType(newRegionType);
  };

  const changeCurRegionNames: ChangeCurRegionNames = (newCurRegionNames) => {
    setCurRegionNames(newCurRegionNames);
  };
  const addCurRegionNames: AddCurRegionName = (newCurRegionName) => {
    setCurRegionNames(oldCurRegionNames => {
      if(oldCurRegionNames.includes(newCurRegionName)) {
        const filteredOldCurRegionName = oldCurRegionNames
          .filter(oldCurRegionName=>oldCurRegionName !== newCurRegionName);
        return filteredOldCurRegionName;
      }

      if(oldCurRegionNames.length === 3) {
        return [newCurRegionName];
      }
      return [...oldCurRegionNames, newCurRegionName];
    });
  };

  // if(regionNames === 'error' || !regionNames) {
  //   return <Message type="error" text="Не удалось загрузить названия регионов." />;
  // }

  return (
    <RegionNamesContext.Provider value={{
      regionType,
      curRegionNames,
      changeRegionType,
      changeCurRegionNames,
      addCurRegionNames
    }}>
      {children}
    </RegionNamesContext.Provider>
  );
};
