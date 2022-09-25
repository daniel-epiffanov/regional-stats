import { createContext, FC, useContext } from 'react';
import { GqlCoordsPoints, GqlCoordsPolygons, RegionTypeArg } from '../../../../../sharedTypes/gqlQueries';
import Message from '../../components/Message';
import useCoordsQueries from './useCoordsQueries';
  
  
type ContextValues = Readonly<{
  coordsPolygons: GqlCoordsPolygons,
  coordsPoints: GqlCoordsPoints,
}>

type ProviderProps = Readonly<{
  regionType: RegionTypeArg
}>

const MapContext = createContext<ContextValues>({} as ContextValues);
  
export const useMapContext = () => useContext(MapContext);
  
export const MapProvider: FC<ProviderProps> = (props) => {
  const {
    children, regionType
  } = props;

  const coords = useCoordsQueries(regionType);

  if (!coords) return <Message type="message" text="Загрузка координат" positionId="vector-map-container" />;

  const {coordsPoints, coordsPolygons} = coords;

  console.log({coordsPoints});

  return (
    <MapContext.Provider value={{
      coordsPolygons,
      coordsPoints,
    }}
    >
      {children}
    </MapContext.Provider>
  );
};
  