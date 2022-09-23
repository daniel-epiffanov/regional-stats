import { createContext, FC, useContext, useState } from 'react';
import { GqlCoordsPolygons, GqlRegionNames, RegionTypeArg } from '../../../../../sharedTypes/gqlQueries';
import Message from '../../components/Message';
import useCoordsPolygonsQuery from './useCoordsPolygonsQuery';
  
  
type ContextValues = Readonly<{
  coordsPolygons: GqlCoordsPolygons,
}>

type ProviderProps = Readonly<{//Omit<ContextValues, 'setCurRegion'> & {
  regionType: RegionTypeArg
}>

const MapContext = createContext<ContextValues>({} as ContextValues);
  
export const useMapContext = () => useContext(MapContext);
  
export const MapProvider: FC<ProviderProps> = (props) => {
  const {
    children, regionType
  } = props;

  const coordsPolygons = useCoordsPolygonsQuery(regionType);

  if (!coordsPolygons) return <Message type="message" text="Загрузка координат" positionId="vector-map-container" />;
  
  return (
    <MapContext.Provider value={{
      coordsPolygons,
    }}
    >
      {children}
    </MapContext.Provider>
  );
};
  