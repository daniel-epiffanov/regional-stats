import { FC } from 'react';
import styles from './AnnualStats.module.scss';
import Title from './Title';
import { useRegionNamesContext } from '../../../context/RegionNamesContext';
import Accordion from './Accordion';
import RatingGrid from './RatingGrid';
import YearSlider from './YearSlider';
import { useAnnualStatsContext } from '../../../context/AnnualStatsContext';

const AnnualStats: FC = () => {
  const { curRegionNames } = useRegionNamesContext();

  if (!curRegionNames.length) return (
    <div className={styles['root']}>
      <YearSlider />
      <h3>Общий рейтинг за текущий год</h3>
      <RatingGrid pageSize={8}/>
    </div>
  );

  return (
    <div className={styles['root']}>
      <YearSlider />
      <Title />
      <Accordion/>
    </div>
  );
};

export default AnnualStats;
