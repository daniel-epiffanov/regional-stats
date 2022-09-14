import { useEffect, useState } from 'react';
import { useMapContext } from '../../../context/MapContext';

type CurRegionMarker = Readonly<{
    coordinates: ReadonlyArray<number>
}>
type CurRegionMarkers = ReadonlyArray<CurRegionMarker>

const useCurRegionMarkers = () => {
  const {curRegionNames, mapRegionCoords} = useMapContext();
  const [curRegionMarkers, setCurRegionMarkers] = useState<CurRegionMarkers>([]);

  // useEffect(()=>{
  //   if(!curRegionNames || curRegionNames.length === 0) return; 
  //   const newCurRegionMarkers = mapRegionCoords
  //     .filter(mapRegionCoordsItem => curRegionNames.includes(mapRegionCoordsItem.properties.name))
  //     .map(mapRegionCoordsItem => ({
  //       coordinates: mapRegionCoordsItem.dot
  //     }));

  //   setCurRegionMarkers(newCurRegionMarkers);
  // }, [curRegionNames, mapRegionCoords]);

  return curRegionMarkers;
};

export default useCurRegionMarkers;