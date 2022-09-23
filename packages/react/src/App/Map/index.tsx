import { FC } from 'react';
import { AnnualStatsProvider } from '../../context/AnnualStatsContext';
import { useCategoriesMenuContext } from '../../context/CategoriesMenuContext';
import { MapProvider } from '../../context/MapContext';
import { useRegionNamesContext } from '../../context/RegionNamesContext';
import styles from './Main.module.scss';
import VectorMap from './VectorMap';


const Map: FC = () => {
  const {regionType} = useRegionNamesContext();
  const {curCategoryNames} = useCategoriesMenuContext();
  const {curMainCategoryName, curSubCategoryName, curSubSubCategoryName} = curCategoryNames;

  return (
    <div className={styles['root']}>
      <AnnualStatsProvider
        regionType={regionType}
        curMainCategoryName={curMainCategoryName}
        curSubCategoryName={curSubCategoryName}
        curSubSubCategoryName={curSubSubCategoryName}
      >

        <MapProvider regionType={regionType}>
          <VectorMap />
        </MapProvider>
      </AnnualStatsProvider>
    </div>
    
  );
};

export default Map;