import moscowImg from '../../../../assets/regions/moscow.jpg';
import { FC } from 'react';
import styles from './TopLeftAnnotation.module.scss';
import { useStatDataContext } from '../../../../context/StatDataContext';
import Chart from './Chart';
import PlacesChart from './PlacesChart';
import GrowthChart from './GrowthChart';
import { useMapContext } from '../../../../context/MapContext';

type Props = Readonly<{

}>

const TopLeftAnnotation: FC<Props> = () => {
  const { statData } = useStatDataContext();
  const { curRegionNames } = useMapContext();
  if (!statData) return null;

  return (
    <div className={styles['root']}>
      <h4>Текущий год</h4>
      <h4>...</h4>
      <h4>Все года</h4>
      <div className={styles['header']}>
        <img
          src={moscowImg}
          alt="moscow"
          width={200}
        />
        <div>
          <h4>{curRegionNames.join(', ')}</h4>
          <h4>2002</h4>
          <p>Trend line: negative</p>
          <p>Номер: 53</p>
          <p>2002 year value: 153.12</p>
          <p>measure: миллионы</p>
        </div>
      </div>
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
