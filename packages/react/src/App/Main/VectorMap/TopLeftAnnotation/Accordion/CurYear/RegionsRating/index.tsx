import { FC } from 'react';
import {
  DataGrid, Paging, Column
} from 'devextreme-react/data-grid';
import styles from './List.module.scss';
import useStatRatingQuery from './useStatRatingQuery';
import { RowClickEvent, RowPreparedEvent } from 'devextreme/ui/data_grid';
import { useMapContext } from '../../../../../../../context/MapContext';
import { GqlStatRating } from '../../../../../../../../../../sharedTypes/gqlQueries';

const renderGridCell = (cellData: Readonly<{value: string}>) => (
  <div>
    <img src={cellData.value} width={48} height={25}></img>
  </div>
);

const RegionsRating: FC = () => {
  const {curRegionNames, addCurRegionNames} = useMapContext();

  const statRating = useStatRatingQuery();
  console.log({statRating});

  const rowPreparedHandler = async (e: RowPreparedEvent<GqlStatRating>) => {
    // console.log({e});
    if(!curRegionNames.includes(e?.data?.regionName)) return null;
    e.rowElement.style.background = 'lightgreen';
  };

  const rowClickHandler = (e: RowClickEvent<GqlStatRating>) => {
    // console.log({e});
    addCurRegionNames(e.data.regionName);
  };

  return (
    <div className={styles['root']}>
      <h3>Общий рейтинг за текущий год</h3>
      <DataGrid
        id="dataGrid"
        dataSource={statRating || undefined}
        keyExpr="place"
        onRowPrepared={rowPreparedHandler}
        onRowClick={rowClickHandler}
        hoverStateEnabled
      >
        <Paging pageSize={5} defaultPageIndex={10} />

        <Column
          dataField="flag"
          width={50}
          cellRender={renderGridCell}
          caption="Флаг"
        />
        <Column dataField="place" width={70} caption="Место"/>
        <Column dataField="value" width={100} caption="Значение"/>
        <Column dataField="regionName" caption="Регион"/>
      </DataGrid>
    </div>
  );
};

export default RegionsRating;