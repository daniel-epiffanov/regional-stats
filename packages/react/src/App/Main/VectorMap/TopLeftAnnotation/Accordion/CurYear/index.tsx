import { FC } from 'react';
import { useMapContext } from '../../../../../../context/MapContext';
import CurYearMultipleRegions from './CurYearMultipleRegions';
import CurYearSingleRegion from './CurYearSingleRegion';
import RegionsRating from './RegionsRating';

const CurYear: FC = () => {
  const {curRegionNames} = useMapContext();

  return (
    <>
      {curRegionNames.length <= 1 ? <CurYearSingleRegion /> : <CurYearMultipleRegions />}
      <RegionsRating />
    </>
  );
};

export default CurYear;