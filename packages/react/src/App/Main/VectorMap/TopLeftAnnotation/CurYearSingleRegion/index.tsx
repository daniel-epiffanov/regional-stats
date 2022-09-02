import { FC } from 'react';
import { useMapContext } from '../../../../../context/MapContext';
import { useStatDataContext } from '../../../../../context/StatDataContext';
import styles from './CurYearSingleRegion.module.scss';

const CurYearSingleRegion: FC = ()  => {
  const {statData} = useStatDataContext();
  const {curRegionNames} = useMapContext();

  if(!statData || !statData[curRegionNames[0]]) return null;
  return (
    <div className={styles['cur-values']}>
      <div>
        <span className={styles['big']}>2002</span>
        <span>год</span>
      </div>
      <div>
        <span className={styles['big']}>{statData[curRegionNames[0]].yearValues[0].value}</span>
        <span>значение</span>
      </div>
      <div>
        <span className={styles['big']}>+20%</span>
        <span>рост</span>
      </div>
    </div>
  );
};

export default CurYearSingleRegion;