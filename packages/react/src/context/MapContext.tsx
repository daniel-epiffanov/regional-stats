import {
  createContext, FC, useContext, useState,
} from 'react';
  
  
type ContextValues = Readonly<{
    curRegionNames: ReadonlyArray<string>
    
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
  
  return (
    <MapContext.Provider value={{
      curRegionNames: curRegionNames,
      changeCurRegionNames,
      addCurRegionNames
    }}
    >
      {children}
    </MapContext.Provider>
  );
};
  