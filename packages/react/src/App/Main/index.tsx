import ResponsiveBox, {
  Row, Col, Item, Location,
} from 'devextreme-react/responsive-box';
import { FC } from 'react';
import CurRegions from './CurRegions';
import { CurValuesProvider } from '../../context/CurValuesContext';
import StatCategoriesMenu from './StatCategoriesMenu';
// import DoughnutChart from '../outdated/DoughnutChart'
// import MeasuresMenu from '../outdated/MeasuresMenu'
import styles from './styles/index.module.scss';
import VectorMap from './VectorMap';
import YearsProgress from './YearsProgress';

const Main: FC = () => {
  // const scrollhandler = (e: Event) => {
  // 	debugger
  // 	console.log('scroll')
  // 	e.preventDefault()
  // }

  return (
    <ResponsiveBox>
      <Row ratio={0} />
      <Row ratio={0} />
      <Row ratio={1} />
      <Row ratio={0} />
      {/* <Col ratio={1} /> */}
      <Col ratio={1} />

      <Item>
        <Location screen="sm md lg" row={0} col={0} rowspan={1} />
        <StatCategoriesMenu />
      </Item>

      {/* <Item>
				<Location screen="sm md lg" row={1} col={0} rowspan={1} />
				<YearsProgress />
			</Item>

			<Item>
				<Location screen="sm md lg" row={2} col={0} />
					<VectorMap />
			</Item>

			<Item>
				<Location screen="sm md lg" row={3} col={0} />
					<CurRegions />
			</Item> */}

    </ResponsiveBox>
  );
};

const HomePagePreloads: FC = () => {
  return (
    <Main />
  );
};

export default HomePagePreloads;
