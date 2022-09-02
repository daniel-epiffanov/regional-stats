import { FC } from 'react';
import {
  Chart as DxChart,
  Series,
  ArgumentAxis,
  Legend,
  Label,
} from 'devextreme-react/chart';
import styles from './styles/index.module.scss';
import { useStatDataContext } from '../../../context/StatDataContext';
import moscowImg from '../../../assets/regions/moscow.jpg';

type Props = Readonly<{

}>

const values = [47.27, 65.32, 84.59, 71.86];

const format = {
  type: 'fixedPoint',
  precision: 1,
};

const Chart: FC<Props> = () => {
  const { statData } = useStatDataContext();
  // const {curRegions} = useMenuValuesContext();
  const curRegions = ['Рязанская область', 'Тульская область', 'Тамбовская область'];

  if (!statData || curRegions.length === 0) return <>yo</>;

  const getValues = (region: string) => statData[region]?.yearValues.map(yearValue => yearValue.value);
  const getYears = (region: string) => statData[region]?.yearValues.map(yearValue => yearValue.year);

  const allData = curRegions.map(curRegion => getValues(curRegion));
  const test = getYears(curRegions[0]).map((year, yearIndex) => ({
    year,
    [curRegions[0]]: allData[0][yearIndex],
    [curRegions[1]]: allData[1] && allData[1][yearIndex],
    [curRegions[2]]: allData[2] && allData[2][yearIndex],
  }));

  // console.log({ test });

  return (
    <div className={styles['root']}>
      <img src={moscowImg} alt="moscow"/>
      <p>Selected regions:
        {' '}
        {curRegions.map(region => (
          <span key={region}>{region}, </span>
        ))}
      </p>
      <DxChart
        // id="chart"
        // @ts-ignore
        dataSource={test}
        title={statData[curRegions[0]].name}
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

// const Chart:FC = () => <h1>hi</h1>;

export default Chart;
