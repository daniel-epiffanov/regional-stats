import { FC } from 'react';
import { AnnualStatsProvider } from '../../context/AnnualStatsContext';
import { useCategoriesMenuContext } from '../../context/CategoriesMenuContext';
import { MapProvider } from '../../context/MapContext';
import { useRegionNamesContext } from '../../context/RegionNamesContext';
import { YearsProvider } from '../../context/YearsContext';
import AnnualStats from './AnnualStats';
import styles from './Map.module.scss';
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
        <YearsProvider>
          <AnnualStats />
          <MapProvider regionType={regionType}>
            <VectorMap />
          </MapProvider>
        </YearsProvider>
      </AnnualStatsProvider>
    </div>
    
  );
};

export default Map;