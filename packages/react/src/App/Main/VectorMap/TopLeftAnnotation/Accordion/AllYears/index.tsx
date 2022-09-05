import { FC } from 'react';
import { useMapContext } from '../../../../../../context/MapContext';
import Chart from './Chart';
import GrowthChart from './GrowthChart';
import PlacesChart from './PlacesChart';

const AllYears: FC = () => {
  const {curRegionNames} = useMapContext();
  
  return (
    <>
      <div style={{width: 300, padding: '20px 0'}}>
        <Chart />
      </div>
      <div style={{width: 300, padding: '20px 0'}}>
        <PlacesChart />
      </div>
      <div style={{width: 300, padding: '20px 0'}}>
        <GrowthChart />
      </div>
    </>
  );
};
  
export default AllYears;