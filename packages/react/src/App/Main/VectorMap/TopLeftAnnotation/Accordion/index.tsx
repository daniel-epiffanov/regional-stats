import { FC } from 'react';
import { Accordion as DxAccordion } from 'devextreme-react/accordion';
import CurYear from './CurYear';
import AllYears from './AllYears';
import StatRating from './StatRating';

type DataSource = ReadonlyArray<Readonly<{
    title: string
}>>
const dataSource: DataSource = [
  { 'title': 'Данные за текущий год'},
  { 'title': 'Общий рейтинг за текущий год'},
  { 'title': 'Данные за все года' }
];

const itemRednerHandler = (e: DataSource[0]) => {
  if(e.title === 'Данные за текущий год') return <CurYear />;
  if(e.title === 'Общий рейтинг за текущий год') return <StatRating />;
  return <AllYears />;
};

const Accordion: FC = () => {
  return (
    <DxAccordion
      dataSource={dataSource}
      itemRender={itemRednerHandler}
      // collapsible
      width="100%"
    />
  );
};

export default Accordion;