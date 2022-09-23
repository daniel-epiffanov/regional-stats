import { FC } from 'react';
import { MapProvider } from '../../context/MapContext';
import { useRegionNamesContext } from '../../context/RegionNamesContext';
import styles from './Main.module.scss';
import VectorMap from './VectorMap';


const Map: FC = () => {
  const {regionType} = useRegionNamesContext();

  return (
    <div className={styles['root']}>
      <MapProvider regionType={regionType}>
        <VectorMap />
      </MapProvider>
    </div>
    
  );
};

export default Map;