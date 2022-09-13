import { FC } from 'react';
import CurRegionIndicators from '../CurRegionIndicators';
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
        <CurRegionIndicators
          key={curRegionName}
          curRegionName={curRegionName}
          rootClassName={styles['indicators-container']}
        />
      ))}
    </div>
  );
};

export default CurYearMultipleRegions;