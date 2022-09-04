import { FC } from 'react';
import { useMapContext } from '../../../../../context/MapContext';
import { useStatDataContext } from '../../../../../context/StatDataContext';
import styles from './CurYearMultipleRegions.module.scss';
import {
  DataGrid, Column
} from 'devextreme-react/data-grid';
import { Series } from 'devextreme-react/chart';
import { PieChart } from 'devextreme-react';
import { Legend } from 'devextreme-react/pie-chart';

const renderGridCell = (cellData: Readonly<{value: string}>) => (
  <div>
    <img src={cellData.value} width={48} height={25}></img>
  </div>
);

const CurYearMultipleRegions: FC = ()  => {
  const {statData} = useStatDataContext();
  const {curRegionNames} = useMapContext();

  if(!statData || !statData[curRegionNames[0]]) return null;

  const dataSource = curRegionNames.map(curRegionName => ({
    region: curRegionName,
    val: statData[curRegionName]?.yearValues[0].value,
    percent: '+20%',
    flag: statData[curRegionName].flag
  }));

  console.log({dataSource});



  return (
    <div className={styles['root']}>

      <DataGrid
        id="dataGrid"
        dataSource={dataSource}
      >
        <Column dataField="flag" width={50} cellRender={renderGridCell}/>
        <Column dataField="region" />
        <Column dataField="percent" width={100}/>
        <Column dataField="val" width={100} />
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