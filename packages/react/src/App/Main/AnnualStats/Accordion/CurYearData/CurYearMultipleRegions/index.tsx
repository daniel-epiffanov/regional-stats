import { FC } from 'react';
import CurRegionSingleRegion from '../CurRegionSingleRegion';
import styles from './CurYearMultipleRegions.module.scss';

type Props = Readonly<{
  curRegionNames: ReadonlyArray<string>,
}>

const CurYearMultipleRegions: FC<Props> = ({
  curRegionNames,
})  => {

  return (
    <div className={styles['root']}>
      {curRegionNames.map(curRegionName => (
        <CurRegionSingleRegion
          key={curRegionName}
          curRegionName={curRegionName}
          rootClassName={styles['indicators-container']}
        />
      ))}
    </div>
  );
};

export default CurYearMultipleRegions;