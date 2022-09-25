import { FC } from 'react';
import { useAnnualStatsContext } from '../../../../../context/AnnualStatsContext';
import styles from './ManyRegions.module.scss';

type Props = Readonly<{
    curRegionNames: ReadonlyArray<string>,
}>

const ManyRegions: FC<Props> = ({curRegionNames}) => {
  const {getRegionFlagUrl} = useAnnualStatsContext();
  return (
    <div className={styles['root']}>
      {curRegionNames.map(curRegionName => (
        <div key={curRegionName} className={styles['region-container']}>
          <img
            className={styles['img']}
            src={getRegionFlagUrl(curRegionName) || ''}
            alt="moscow"
            width={120}
            height={70}
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