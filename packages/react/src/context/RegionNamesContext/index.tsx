import {
  createContext, FC, useContext, useState,
} from 'react';
import { GqlRegionNames, RegionTypeArg } from '../../../../../sharedTypes/gqlQueries';
import { REGION_TYPE } from '../../config/settings';

type ContextValues = Readonly<{
	regionType: RegionTypeArg,
  changeRegionType: ChangeRegionType,

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
  const [regionType, setRegionType] = useState<RegionTypeArg>(REGION_TYPE);
  const [curRegionNames, setCurRegionNames] = useState<GqlRegionNames>([]);


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
