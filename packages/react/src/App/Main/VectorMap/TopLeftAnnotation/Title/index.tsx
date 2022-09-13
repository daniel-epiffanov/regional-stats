import { FC } from 'react';
import { useMapContext } from '../../../../../context/MapContext';
import { useStatDataContext } from '../../../../../context/StatDataContext';
import ManyRegions from './ManyRegions';
import SingleRegion from './SingleRegion';

const Title: FC = () => {
  const {curRegionNames} = useMapContext();
  const {statData} = useStatDataContext();

  if(!statData) return null;

  if(curRegionNames.length === 1) {
    return <SingleRegion curRegionName={curRegionNames[0]}/>;
  }

  return <ManyRegions curRegionNames={curRegionNames}/>;
};

export default Title;