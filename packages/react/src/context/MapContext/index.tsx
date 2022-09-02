import {
  createContext, FC, useContext, useState,
} from 'react';
import { GqlMapRegionNames, RegionCoords } from '../../../../../sharedTypes/gqlQueries';
import Message from '../../components/Message';
import useCoordsQuery from './useCoordsQuery';
  
  
type ContextValues = Readonly<{
    curRegionNames: ReadonlyArray<string>
    mapRegionCoords: RegionCoords
    mapRegionNames: GqlMapRegionNames
    
    changeCurRegionNames: ChangeCurRegionNames,
    addCurRegionNames: AddCurRegionName
}>

type ContextStateValues = Omit<ContextValues, 'setCurRegion'>
type ChangeCurRegionNames = (newCurRegion: ContextValues['curRegionNames']) => void
type AddCurRegionName = (newCurRegion: string) => void
  
  
const MapContext = createContext<ContextValues>({} as ContextValues);
  
export const useMapContext = () => useContext(MapContext);
  
export const MapProvider: FC<Partial<ContextStateValues>> = (props) => {
  const {
    children,
    curRegionNames: defaultCurRegionNames
  } = props;

  const regionCoords = useCoordsQuery();
      
  const [curRegionNames, setCurRegionNames] = useState<ContextValues['curRegionNames']>(defaultCurRegionNames || ['Рязанская область']);
  
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
      return [...oldCurRegionNames, newCurRegionName];
    });
  };

  console.log({regionCoords});

  if (!regionCoords) return <Message type="message" text="Загрузка координат" positionId="vector-map-container" />;
  
  return (
    <MapContext.Provider value={{
      curRegionNames: curRegionNames,
      mapRegionCoords: regionCoords.mapRegionCoords,
      mapRegionNames: regionCoords.mapRegionNames,
      changeCurRegionNames,
      addCurRegionNames
    }}
    >
      {children}
    </MapContext.Provider>
  );
};
  