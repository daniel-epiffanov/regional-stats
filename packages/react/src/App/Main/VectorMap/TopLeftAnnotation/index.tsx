import moscowImg from '../../../../assets/regions/moscow.jpg';
import { FC } from 'react';
import styles from './TopLeftAnnotation.module.scss';
import { useStatDataContext } from '../../../../context/StatDataContext';
import Chart from './Accordion/AllYears/Chart';
import PlacesChart from './Accordion/AllYears/PlacesChart';
import GrowthChart from './Accordion/AllYears/GrowthChart';
import { useMapContext } from '../../../../context/MapContext';
import StatRating from './Accordion/CurYear/StatRating';
import CurRegionIndicators from './Accordion/CurYear/CurRegionIndicators';
import CurYearMultipleRegions from './Accordion/CurYear/CurYearMultipleRegions';
import Title from './Title';
import Accordion from './Accordion';

type Props = Readonly<{

}>

const TopLeftAnnotation: FC<Props> = () => {
  const { statData } = useStatDataContext();
  const { curRegionNames } = useMapContext();
  if (!statData || !curRegionNames) return null;

  return (
    <div className={styles['root']}>
      <Title />
      <Accordion />
    </div>
  );
};

export default TopLeftAnnotation;
