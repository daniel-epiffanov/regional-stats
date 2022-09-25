import { FC } from 'react';
import { useRegionNamesContext } from '../../../../context/RegionNamesContext';
import ManyRegions from './ManyRegions';
import SingleRegion from './SingleRegion';

const Title: FC = () => {
  const {curRegionNames} = useRegionNamesContext();

  if(curRegionNames.length === 1) {
    return <SingleRegion curRegionName={curRegionNames[0]}/>;
  }

  return <ManyRegions curRegionNames={curRegionNames}/>;
};

export default Title;