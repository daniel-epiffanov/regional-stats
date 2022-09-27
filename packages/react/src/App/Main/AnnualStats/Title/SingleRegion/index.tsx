import { FC } from 'react';
import { useAnnualStatsContext } from '../../../../../context/AnnualStatsContext';
import { useYearsContext } from '../../../../../context/YearsContext';
import styles from './SingleRegion.module.scss';

type Props = Readonly<{
    curRegionName: string,
}>

const SingleRegion: FC<Props> = ({curRegionName}) => {
  const {getRegionFlagUrl} = useAnnualStatsContext();

  return (
    <div className={styles['root']}>
      <img
        className={styles['img']}
        src={getRegionFlagUrl(curRegionName) || ''}
        alt="moscow"
        width={80}
        height={50}
      />
      <div className={styles['title']}>
        <h3>{curRegionName}</h3>
      </div>
    </div>
  );
};

export default SingleRegion;