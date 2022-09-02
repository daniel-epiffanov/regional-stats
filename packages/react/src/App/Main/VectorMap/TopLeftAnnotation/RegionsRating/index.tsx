import { FC } from 'react';
import {
  DataGrid, Paging, Export, Column
} from 'devextreme-react/data-grid';
import { usePrefetchedValuesContext } from '../../../../../context/PrefetchedValuesContext';
import styles from './List.module.scss';
import useStatRatingQuery from './useStatRatingQuery';
import { RowPreparedEvent } from 'devextreme/ui/data_grid';
import { useMapContext } from '../../../../../context/MapContext';


const RegionsRating: FC = () => {
  const {statRegionNames} = usePrefetchedValuesContext();
  const {curRegionNames} = useMapContext();
  // const dataSource = statRegionNames.map((statRegionName, i) => ({
  //   place: i+1,
  //   regionName: statRegionName,
  //   flag: 'mosc'
  // }));

  const statRating = useStatRatingQuery();
  console.log({statRating});

  const rowPreparedHandler = async (e: RowPreparedEvent) => {
    console.log({e});
    if(!e.values?.includes(curRegionNames[0])) return null;
    e.rowElement.style.background = 'lightgreen';
    // eslint-disable-next-line no-debugger
    // debugger;
  };

  return (
    <div className={styles['root']}>
      <h3>Общий рейтинг за 2002 год</h3>
      <DataGrid
        id="dataGrid"
        dataSource={statRating || undefined}
        keyExpr="place"
        onRowPrepared={rowPreparedHandler}
      >
        {/* <Export enabled={true} /> */}
        <Paging pageSize={5} defaultPageIndex={10} />

        <Column dataField="place" width={50}/>
        <Column dataField="value" width={100}/>
        <Column dataField="regionName"/>
      </DataGrid>
    </div>
  );
};

export default RegionsRating;