import { FC } from 'react';
import { Accordion as DxAccordion } from 'devextreme-react/accordion';
import CurYearData from './CurYearData';

type DataSource = ReadonlyArray<Readonly<{
    title: string
}>>
const dataSource: DataSource = [
  { 'title': 'Данные за текущий год'},
  { 'title': 'Общий рейтинг за текущий год'},
  { 'title': 'Данные за все года' }
];

const itemRedner = (e: DataSource[0]) => {
  if(e.title === 'Данные за текущий год') return <CurYearData />;
  if(e.title === 'Общий рейтинг за текущий год') return null;
  return null;
};

const Accordion: FC = () => {
  return (
    <DxAccordion
      dataSource={dataSource}
      itemRender={itemRedner}
      // collapsible
      width="100%"
    />
  );
};

export default Accordion;