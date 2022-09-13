import { FC } from 'react';
import { useMapContext } from '../../../../../../context/MapContext';
import CurYearMultipleRegions from './CurYearMultipleRegions';
import CurRegionIndicators from './CurRegionIndicators';
import StatRating from './StatRating';

const CurYear: FC = () => {
  const {curRegionNames} = useMapContext();

  const curRegionName = curRegionNames[0];

  if(curRegionNames.length <= 1 ) return (
    <>
      <CurRegionIndicators curRegionName={curRegionName}/>
      <StatRating />
    </>
  );

  return (
    <>
      <CurYearMultipleRegions />
      <StatRating />
    </>
  );
};

export default CurYear;