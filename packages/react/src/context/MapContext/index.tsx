import {
  createContext, FC, useContext, useState,
} from 'react';
import { GqlMapRegionNames, GqlMapRegionPolygons } from '../../../../../sharedTypes/gqlQueries';
import Message from '../../components/Message';
import useCoordsQuery from './useCoordsQuery';
  
  
type ContextValues = Readonly<{
    curRegionNames: ReadonlyArray<string>
    mapRegionCoords: GqlMapRegionPolygons
    mapRegionNames: GqlMapRegionNames,
    curYear: number
    
    changeCurYear: ChangeCurYear,
    changeCurRegionNames: ChangeCurRegionNames,
    addCurRegionNames: AddCurRegionName
}>

type ContextStateValues = Omit<ContextValues, 'setCurRegion'>
type ChangeCurRegionNames = (newCurRegion: ContextValues['curRegionNames']) => void
type ChangeCurYear = (newCurYear: number) => void
type AddCurRegionName = (newCurRegion: string) => void
  
  
const MapContext = createContext<ContextValues>({} as ContextValues);
  
export const useMapContext = () => useContext(MapContext);
  
export const MapProvider: FC<Partial<ContextStateValues>> = (props) => {
  const {
    children,
    curRegionNames: defaultCurRegionNames
  } = props;

  const regionCoords = useCoordsQuery();
      
  const [curYear, setCurYear] = useState<number>(2002);
  const [curRegionNames, setCurRegionNames] = useState<ContextValues['curRegionNames']>(defaultCurRegionNames || ['Рязанская область']);
  
  const changeCurYear: ChangeCurYear = (newCurYear) => {
    setCurYear(newCurYear);
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
      return [...oldCurRegionNames, newCurRegionName];
    });
  };

  console.log({regionCoords});

  if (!regionCoords) return <Message type="message" text="Загрузка координат" positionId="vector-map-container" />;
  
  return (
    <MapContext.Provider value={{
      curRegionNames: curRegionNames,
      mapRegionCoords: regionCoords.mapRegionPolygons,
      mapRegionNames: regionCoords.mapRegionNames,
      curYear,
      changeCurYear,
      changeCurRegionNames,
      addCurRegionNames
    }}
    >
      {children}
    </MapContext.Provider>
  );
};
  