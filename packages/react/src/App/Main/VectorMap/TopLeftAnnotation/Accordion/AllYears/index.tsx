import { FC } from 'react';
import { YearsRangeProvider } from '../../../../../../context/YearsRangeContext';
import Chart from './Chart';
import GrowthChart from './GrowthChart';
import PlacesChart from './PlacesChart';
import YearsSlider from './YearsSlider';

const AllYears: FC = () => {
  
  return (
    <YearsRangeProvider>

      <YearsSlider />
      <div style={{width: 300, padding: '20px 0'}}>
        <Chart />
      </div>
      {/* <div style={{width: 300, padding: '20px 0'}}>
        <PlacesChart />
      </div>
      <div style={{width: 300, padding: '20px 0'}}>
        <GrowthChart />
      </div> */}
    </YearsRangeProvider>
  );
};
  
export default AllYears;