import { FC, useEffect, useState } from 'react';
import {
  DataGrid, Paging, Column, Button
} from 'devextreme-react/data-grid';
import styles from './RegionsRating.module.scss';
import useFetchStatRating from '../../../../../../../queryHooks/useFetchStatRating';
import { RowPreparedEvent } from 'devextreme/ui/data_grid';
import { useMapContext } from '../../../../../../../context/MapContext';
import { GqlStatRating } from '../../../../../../../../../../sharedTypes/gqlQueries';

const renderGridCell = (cellData: Readonly<{value: string}>) => (
  <div>
    <img src={cellData.value} width={48} height={25}></img>
  </div>
);

const PAGE_SIZE = 5;

const StatRating: FC = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const {curRegionNames} = useMapContext();

  const statRating = useFetchStatRating();

  const flagRenderingHandler = async (e: RowPreparedEvent<GqlStatRating>) => {
    if(!curRegionNames.includes(e?.data?.regionName)) return null;
    e.rowElement.style.background = 'lightgreen';
  };

  useEffect(()=>{
    if(!statRating || !curRegionNames[0]) return;
    const regionIndex = statRating.findIndex(statRatingItem=>statRatingItem.regionName === curRegionNames[0]);
    const page = Math.floor(regionIndex / PAGE_SIZE);
    setPageIndex(page);
  }, [statRating, curRegionNames[0]]);


  const pageIndexChangeHandler = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  

  return (
    <div className={styles['root']}>
      <h3>Общий рейтинг за текущий год</h3>
      <DataGrid
        id="dataGrid"
        dataSource={statRating || undefined}
        keyExpr="place"
        onRowPrepared={flagRenderingHandler}
        hoverStateEnabled
      >
        <Paging
          pageSize={PAGE_SIZE}
          onPageIndexChange={pageIndexChangeHandler}
          pageIndex={pageIndex}
        />

        <Column
          dataField="place"
          width={50}
          caption="Место"
          allowSorting={false}
        />
        <Column
          dataField="flag"
          width={50}
          cellRender={renderGridCell}
          caption="Флаг"
          allowSorting={false}
        />
        <Column
          dataField="regionName"
          caption="Регион"
          allowSorting={false}
        />
        <Column
          dataField="prettyValue"
          width={100}
          caption="Значение"
          allowSorting={false}
        />
      </DataGrid>
    </div>
  );
};

export default StatRating;