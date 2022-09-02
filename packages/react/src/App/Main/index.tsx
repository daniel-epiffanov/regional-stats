import ResponsiveBox, {
  Row, Col, Item, Location,
} from 'devextreme-react/responsive-box';
import { FC, useEffect } from 'react';
import { useStatDataContext } from '../../context/StatDataContext';
import CurRegions from './CurRegions';
// import { CurMenuValuesProvider } from '../../context/CurMenuValuesContext';
import StatCategoriesMenu from './StatCategoriesMenu';
// import DoughnutChart from '../outdated/DoughnutChart'
// import MeasuresMenu from '../outdated/MeasuresMenu'
import styles from './Main.module.scss';
import VectorMap from './VectorMap';
import YearsProgress from './DashboardCards';
import { MapProvider } from '../../context/MapContext';


const Main: FC = () => {
  const statData = useStatDataContext();

  // useEffect(()=>{
  //   console.log(statData);
  // }, [statData]);

  return (
    <div className={styles['root']}>
      <StatCategoriesMenu />
      <MapProvider>
        <VectorMap />
      </MapProvider>
    </div>
    
  );
};

export default Main;



// {/* <ResponsiveBox>
//       <Row ratio={0} />
//       <Row ratio={1} />
//       <Col ratio={1} />

//       <Item>
//         <Location screen="sm md lg" row={0} col={0} rowspan={1} />
//         <StatCategoriesMenu />
//       </Item>

//       <Item>
//         <Location screen="sm md lg" row={1} col={0} rowspan={1} />
//         <YearsProgress />
//       </Item>

//       <Item>
//         <Location screen="sm md lg" row={1} col={0} />
//         <MapProvider>
//           <VectorMap />
//         </MapProvider>
//       </Item>

//       <Item>
//         <Location screen="sm md lg" row={3} col={0} />
//         <CurRegions />
//       </Item>

//     </ResponsiveBox> */}