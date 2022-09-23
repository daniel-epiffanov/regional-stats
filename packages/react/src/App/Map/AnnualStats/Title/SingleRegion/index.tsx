import { FC } from 'react';
import { useAnnualStatsContext } from '../../../../../context/AnnualStatsContext';
import { useYearsContext } from '../../../../../context/YearsContext';
import styles from './SingleRegion.module.scss';

type Props = Readonly<{
    curRegionName: string,
}>

const SingleRegion: FC<Props> = ({curRegionName}) => {
  const {curYear} = useYearsContext();
  const {getRegionFlagUrl} = useAnnualStatsContext();

  return (
    <div className={styles['root']}>
      <img
        className={styles['img']}
        src={getRegionFlagUrl(curRegionName) || ''}
        alt="moscow"
        width={150}
        height={80}
      />
      <div className={styles['title']}>
        <h3>{curRegionName}</h3>
        <p>{curYear}</p>
      </div>
    </div>
  );
};

export default SingleRegion;