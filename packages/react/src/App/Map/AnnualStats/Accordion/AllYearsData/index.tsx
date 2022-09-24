import { FC } from 'react';
import { YearsRangeProvider } from '../../../../../context/YearsRangeContext';
import AnnualDataChart from './AnnualDataChart';
import GrowthChart from './GrowthChart';
import PlacesChart from './PlacesChart';
import YearsSlider from './YearsSlider';

const AllYearsData: FC = () => {
  
  return (
    <YearsRangeProvider>

      <YearsSlider />
      <div style={{width: 300, padding: '20px 0'}}>
        <AnnualDataChart />
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
  
export default AllYearsData;