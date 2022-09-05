import { FC } from 'react';
import { Accordion as DxAccordion } from 'devextreme-react/accordion';
import CurYear from './CurYear';
import AllYears from './AllYears';

type DataSource = ReadonlyArray<Readonly<{
    title: string
}>>
const dataSource: DataSource = [
  { 'title': 'Данные за текущий год'},
  { 'title': 'Данные за все года' }
];

const Accordion: FC = () => {
  const itemRednerHandler = (e: DataSource[0]) => {
    if(e.title === 'Данные за текущий год') return <CurYear />;
    return <AllYears />;
  };
  return (
    <DxAccordion
      dataSource={dataSource}
      itemRender={itemRednerHandler}
      collapsible
    />
  );
};

export default Accordion;