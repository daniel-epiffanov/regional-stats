import {
  createContext, FC, useContext, useState,
} from 'react';
import { GqlRegionNames, RegionTypeArg } from '../../../../../sharedTypes/gqlQueries';
import Message from '../../components/Message';
import useFetchRegionNames from './useFetchRegionNames';

type ContextValues = Readonly<{
	regionType: RegionTypeArg,
  changeRegionType: ChangeRegionType,
  regionNames: GqlRegionNames
}>

type ChangeRegionType = (newRegionType: RegionTypeArg) => void

const RegionNamesContext = createContext<ContextValues>({} as ContextValues);

export const useRegionNamesContext = () => useContext(RegionNamesContext);

export const RegionNamesProvider: FC = ({ children }) => {
  const [regionType, setRegionType] = useState<RegionTypeArg>('region');
  const changeRegionType: ChangeRegionType = (newRegionType) => {
    setRegionType(newRegionType);
  };
  
  const regionNames = useFetchRegionNames(regionType);

  if (!regionNames) return <Message type="message" text="Не удалось загрузить названия регионов" />;

  return (
    <RegionNamesContext.Provider value={{
      regionType,
      changeRegionType,
      regionNames
    }}>
      {children}
    </RegionNamesContext.Provider>
  );
};
