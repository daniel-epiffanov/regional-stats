import { FC } from 'react';
import { useMapContext } from '../../../../../context/MapContext';
import { useStatDataContext } from '../../../../../context/StatDataContext';
import styles from './CurYearMultipleRegions.module.scss';
import {
  DataGrid, Paging, Export, Column
} from 'devextreme-react/data-grid';
import { Chart, Series } from 'devextreme-react/chart';
import { PieChart } from 'devextreme-react';
import { Legend } from 'devextreme-react/pie-chart';

const CurYearMultipleRegions: FC = ()  => {
  const {statData} = useStatDataContext();
  const {curRegionNames} = useMapContext();

  if(!statData || !statData[curRegionNames[0]]) return null;

  const dataSource = curRegionNames.map(curRegionName => ({
    region: curRegionName,
    val: statData[curRegionName]?.yearValues[0].value,
    percent: '+20%'
  }));

  console.log({dataSource});



  return (
    <div className={styles['root']}>

      <DataGrid
        id="dataGrid"
        dataSource={dataSource}
        // keyExpr="place"
        // onRowPrepared={rowPreparedHandler}
      >
        <Export enabled={true} />
        {/* <Paging pageSize={5} defaultPageIndex={10} /> */}

        {/* <Column dataField="place" width={50}/>
        <Column dataField="value" width={100}/>
      <Column dataField="regionName"/> */}
      </DataGrid>
      <div className={styles['doughnut-container']}>
        <PieChart id="chart" dataSource={dataSource} size={{width: 150, height: 200}}>
          <Series
          // valueField="region"
            argumentField="region"
            name="My oranges"
            type="doughnut" />
          <Legend
            margin={0}
            horizontalAlignment="left"
            verticalAlignment="vottom"
          />
        </PieChart>

        <div className={styles['cur-values']}>
          <span className={styles['big']}>+3%</span>
          <span>общий рост</span>
        </div>
      </div>
    </div>
  );
};

export default CurYearMultipleRegions;