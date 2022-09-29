import { FC } from 'react';
import { AnnualStatsProvider } from '../../context/AnnualStatsContext';
import { useCategoriesMenuContext } from '../../context/CategoriesMenuContext';
import { MapProvider } from '../../context/MapContext';
import { useRegionNamesContext } from '../../context/RegionNamesContext';
import { YearsProvider } from '../../context/YearsContext';
import getCurTheme from '../../helpers/getCurTheme';
import AnnualStats from './AnnualStats';
import Controls from './Controls';
import styles from './Main.module.scss';
import VectorMap from './VectorMap';
import dxOverridesStyles from '../../styles/dxOverrides.module.scss';
import { DARK_THEME_NAME } from '../../config/theme';

const curTheme = getCurTheme();

const Main: FC = () => {
  const {regionType} = useRegionNamesContext();
  const {curCategoryNames} = useCategoriesMenuContext();
  const {curMainCategoryName, curSubCategoryName, curSubSubCategoryName} = curCategoryNames;

  const dxOverridesClass= curTheme === DARK_THEME_NAME ? dxOverridesStyles['dark'] : dxOverridesStyles['light'];

  return (
    <div className={`${styles['root']} ${dxOverridesClass}`}>
      <AnnualStatsProvider
        regionType={regionType}
        curMainCategoryName={curMainCategoryName}
        curSubCategoryName={curSubCategoryName}
        curSubSubCategoryName={curSubSubCategoryName}
      >
        <YearsProvider
          regionType={regionType}
          curMainCategoryName={curMainCategoryName}
          curSubCategoryName={curSubCategoryName}
          curSubSubCategoryName={curSubSubCategoryName}
        >
          <AnnualStats />
          <Controls />
          <MapProvider regionType={regionType}>
            <VectorMap />
          </MapProvider>
        </YearsProvider>
      </AnnualStatsProvider>
    </div>
    
  );
};

export default Main;