import { FC } from 'react';
import CurYearMultipleRegions from './CurYearMultipleRegions';
import CurRegionSingleRegion from './CurRegionSingleRegion';
import { useRegionNamesContext } from '../../../../../context/RegionNamesContext';
// import StatRating from './StatRating';

const CurYearData: FC = () => {
  const {curRegionNames} = useRegionNamesContext();

  if(curRegionNames.length > 1 ) return (
    <CurYearMultipleRegions curRegionNames={curRegionNames}/>
  );

  const curRegionName = curRegionNames[0];
  
  return (
    <CurRegionSingleRegion curRegionName={curRegionName}/>
  );

};

export default CurYearData;