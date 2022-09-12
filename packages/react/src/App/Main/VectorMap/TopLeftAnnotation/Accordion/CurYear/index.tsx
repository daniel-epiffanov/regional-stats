import { FC } from 'react';
import { useMapContext } from '../../../../../../context/MapContext';
import CurYearMultipleRegions from './CurYearMultipleRegions';
import CurRegionIndicators from './CurRegionIndicators';
import RegionsRating from './RegionsRating';

const CurYear: FC = () => {
  const {curRegionNames} = useMapContext();

  const curRegionName = curRegionNames[0];

  if(curRegionNames.length <= 1 ) return (
    <>
      <CurRegionIndicators curRegionName={curRegionName}/>
      <RegionsRating />
    </>
  );

  return (
    <>
      <CurYearMultipleRegions />
      <RegionsRating />
    </>
  );
};

export default CurYear;