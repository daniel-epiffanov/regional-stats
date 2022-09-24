import { FC } from 'react';
import { Accordion as DxAccordion } from 'devextreme-react/accordion';
import CurYearData from './CurYearData';
import Rating from './Rating';
import { useRegionNamesContext } from '../../../../context/RegionNamesContext';

type DataSource = Readonly<{
    title: string,
    ID?: number
}>[]
const dataSource: DataSource = [
  { 'title': 'Данные за текущий год'},
  { 'title': 'Общий рейтинг за текущий год'},
  { 'title': 'Данные за все года' }
];

const itemRedner = (e: DataSource[0]) => {
  if(e.title === 'Данные за текущий год') return <CurYearData />;
  if(e.title === 'Общий рейтинг за текущий год') return <Rating />;
  return null;
};

const Accordion: FC = () => {
  const {curRegionNames} = useRegionNamesContext();

  if(curRegionNames.length) return (
    <DxAccordion
      dataSource={dataSource}
      defaultSelectedItems={dataSource}
      itemRender={itemRedner}
      multiple
      width="100%"
    />
  );

  // return null;

  return <Rating />;
};

export default Accordion;