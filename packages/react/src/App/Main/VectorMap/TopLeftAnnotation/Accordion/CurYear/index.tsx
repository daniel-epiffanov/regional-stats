import { FC } from 'react';
import { useMapContext } from '../../../../../../context/MapContext';
import CurYearMultipleRegions from './CurYearMultipleRegions';
import CurRegionIndicators from './CurRegionIndicators';
// import StatRating from './StatRating';

const CurYear: FC = () => {
  const {curRegionNames} = useMapContext();

  if(curRegionNames.length > 1 ) return (
    <CurYearMultipleRegions curRegionNames={curRegionNames}/>
  );

  const curRegionName = curRegionNames[0];
  
  return (
    <CurRegionIndicators curRegionName={curRegionName}/>
  );

};

export default CurYear;