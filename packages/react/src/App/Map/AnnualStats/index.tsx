import { FC } from 'react';
import styles from './AnnualStats.module.scss';
import Title from './Title';
import { useRegionNamesContext } from '../../../context/RegionNamesContext';
import Accordion from './Accordion';
import RatingData from './Accordion/RatingData';

type Props = Readonly<{

}>

const AnnualStats: FC<Props> = () => {
  const { curRegionNames } = useRegionNamesContext();

  if (!curRegionNames.length) return (
    <div className={styles['root']}>
      <RatingData />
    </div>
  );

  return (
    <div className={styles['root']}>
      <Title />
      <Accordion/>
    </div>
  );
};

export default AnnualStats;
