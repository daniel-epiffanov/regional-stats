import { FC } from 'react';
import { Accordion as DxAccordion } from 'devextreme-react/accordion';
import CurYearData from './CurYearData';
import RatingGrid from '../RatingGrid';
import AllYearsData from './AllYearsData';
import { YearsRangeProvider } from '../../../../context/YearsRangeContext';

type DataSource = Readonly<{
    title: string
}>[]
const dataSource: DataSource = [
  { 'title': 'Данные за текущий год'},
  { 'title': 'Общий рейтинг за текущий год'},
  { 'title': 'Данные за все года' }
];

const itemRedner = (e: DataSource[0]) => {
  if(e.title === 'Данные за текущий год') return <CurYearData />;
  if(e.title === 'Общий рейтинг за текущий год') return <RatingGrid />;
  if(e.title === 'Данные за все года') return (
    <YearsRangeProvider>
      <AllYearsData />
    </YearsRangeProvider>
  );
  return null;
};

const Accordion: FC = () => {

  return (
    <DxAccordion
      dataSource={dataSource}
      defaultSelectedItems={dataSource}
      itemRender={itemRedner}
      multiple
      width="-webkit-fill-available"
      collapsible
    />
  );
};

export default Accordion;