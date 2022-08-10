import { FC } from 'react';
import {
  Chart as DxChart,
  Series,
  ArgumentAxis,
  Legend,
  Label,
} from 'devextreme-react/chart';
import styles from './styles/index.module.scss';
import { useCurMenuValuesContext } from '../../../context/CurMenuValuesContext';
import Message from '../../../components/Message';

type Props = Readonly<{

}>

const values = [47.27, 65.32, 84.59, 71.86];

const format = {
  type: 'fixedPoint',
  precision: 1,
};

const Chart: FC<Props> = () => {
  const { curStatData, curRegions } = useCurMenuValuesContext();

  if (!curStatData || curRegions.length === 0) return <>yo</>;
  // <Message type='message' text="Please, choose a region on the map"/>

  // const curRegion = curStatData['Рязанская область']

  const getValues = (region: string) => curStatData[region]?.yearValues.map(yearValue => yearValue.value);
  const getYears = (region: string) => curStatData[region]?.yearValues.map(yearValue => yearValue.year);
  // console.log({values})

  const allData = curRegions.map(curRegion => getValues(curRegion));
  const test = getYears(curRegions[0]).map((year, yearIndex) => ({
    year,
    [curRegions[0]]: allData[0][yearIndex],
    [curRegions[1]]: allData[1] && allData[1][yearIndex],
    [curRegions[2]]: allData[2] && allData[2][yearIndex],
  }));

  console.log({ test });

  return (
    <div className={styles.root}>
      <p>Selected regions:
        {' '}
        {curRegions.map(region => (
          <span>{region}, </span>
        ))}
      </p>
		 <DxChart
        // id="chart"
        // @ts-ignore
        dataSource={test}
        title={curStatData[curRegions[0]].name}
        size={{
          height: 200,
          width: 800,
        }}
		 >
        <Series
          argumentField="year"
					 	valueField={curRegions[0]}
          name={curRegions[0]}
        />
        <Series
          argumentField="year"
          valueField={curRegions[1]}
          name={curRegions[1]}
        />
        <Series
          argumentField="year"
          valueField={curRegions[2]}
          name={curRegions[2]}
        />
        <ArgumentAxis>
          <Label
            wordWrap="none"
            // overlappingBehavior={this.state.currentMode}
          />
        </ArgumentAxis>
        <Legend visible={false} />
      </DxChart>

      <div>
        <b>Рязанская область</b>
        <div> slope: 74 </div>
        <div> total growth since 2000: 514%</div>
        <div> growth trend: negative</div>
      </div>

				there will be table here (same as cards BUT detalized upon regions)

				trend line grapg

				and outlining years

				table will be colored based on differences in values
    </div>
  );
};

export default Chart;
