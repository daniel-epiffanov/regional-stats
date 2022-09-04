import moscowImg from '../../../../assets/regions/moscow.jpg';
import { FC } from 'react';
import styles from './TopLeftAnnotation.module.scss';
import { useStatDataContext } from '../../../../context/StatDataContext';
import Chart from './Chart';
import PlacesChart from './PlacesChart';
import GrowthChart from './GrowthChart';
import { useMapContext } from '../../../../context/MapContext';
import RegionsRating from './RegionsRating';
import CurYearSingleRegion from './CurYearSingleRegion';
import CurYearMultipleRegions from './CurYearMultipleRegions';

type Props = Readonly<{

}>

const TopLeftAnnotation: FC<Props> = () => {
  const { statData } = useStatDataContext();
  const { curRegionNames } = useMapContext();
  if (!statData || !curRegionNames) return null;

  return (
    <div className={styles['root']}>
      {curRegionNames.length <= 1 ? (      <div className={styles['header']}>
        <img
          src={statData[curRegionNames[0]].flag}
          alt="moscow"
          width={150}
          height={80}
        />
        <div>
          <h3>{curRegionNames.join(', ')}</h3>
          <h1>58,12</h1>
        </div>
      </div>) : <h2>Режим сравнения</h2>}
      <h4>Текущий год</h4>
      {curRegionNames.length <= 1 ? <CurYearSingleRegion /> : <CurYearMultipleRegions />}
      <RegionsRating />
      
      <h4>Все года</h4>
      <div style={{width: 300, padding: '20px 0'}}>
        <Chart />
      </div>
      <div style={{width: 300, padding: '20px 0'}}>
        <PlacesChart />
      </div>
      <div style={{width: 300, padding: '20px 0'}}>
        <GrowthChart />
      </div>
      {/* <div style={{width: 400}}>
        <DashboardCards />
      </div> */}
    </div>
  );
};

// const TopLeftAnnotation: FC = () => <h1>mock</h1>;

export default TopLeftAnnotation;
