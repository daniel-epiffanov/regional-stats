import { FC } from 'react';
import { useMapContext } from '../../../../../../context/MapContext';
import { useStatDataContext } from '../../../../../../context/StatDataContext';
import styles from './ManyRegions.module.scss';

type Props = Readonly<{
    curRegionNames: ReadonlyArray<string>,
}>

const ManyRegions: FC<Props> = ({curRegionNames}) => {
  const {statData} = useStatDataContext();

  if(!statData) return null;

  return (
    <div className={styles['root']}>
      {curRegionNames.map(curRegionName => (
        <div key={curRegionName} className={styles['region-container']}>
          <img
            className={styles['img']}
            src={statData[curRegionName].flag}
            alt="moscow"
            width={140}
            height={80}
          />
          <div className={styles['title']}>
            <h3>{curRegionName}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManyRegions;