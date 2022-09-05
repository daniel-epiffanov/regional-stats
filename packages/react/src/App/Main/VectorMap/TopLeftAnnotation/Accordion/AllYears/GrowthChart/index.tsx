import { FC, useState } from 'react';
import { useStatDataContext } from '../../../../../../../context/StatDataContext';
import {
  Chart as DxChart,
  Series,
  ArgumentAxis,
  Legend,
  Label,
} from 'devextreme-react/chart';
import { RangeSlider } from 'devextreme-react';

const GrowthChart: FC = () => {
  const {statData} = useStatDataContext();
  const curRegions = ['Рязанская область', 'Тульская область', 'Тамбовская область'];
  const [range, setRange] = useState([2005, 2009]);

  if (!statData || curRegions.length === 0) return <>yo</>;

  const getValues = (region: string) => statData[region]?.yearValues.map(yearValue => yearValue.value);
  const getYears = (region: string) => statData[region]?.yearValues.map(yearValue => yearValue.year);

  const allData = curRegions.map(curRegion => getValues(curRegion));


  const dataSource = [{
    day: 2006,
    oranges: 5,
    apples: 2,
  }, {
    day: 2005,
    oranges: 6,
    apples: 3,
  }, {
    day: 2004,
    oranges: 9,
    apples: 2,
  }, {
    day: 2003,
    oranges: 6,
    apples: 7,
  }, {
    day: 2002,
    oranges: 7,
    apples: 2,
  }, {
    day: 2001,
    oranges: 4,
    apples: 2,
  }, {
    day: 2000,
    oranges: 9,
    apples: 6,
  }];

  return (
    <div>

      <DxChart
      // id="chart"
      // @ts-ignore
        dataSource={dataSource}
        title="График роста"
        size={{
          height: 250,
          width: 450,
        }}
        // scrollBar={{
        //   visible: true,
        // // position: 'bottom',
        // }}
        //   adjustOnZoom
        // resizePanesOnZoom
        //   zoomAndPan={{
        //     argumentAxis: 'pan'
        //   }}
        //   argumentAxis={{
        //     tickInterval: 3,
        //     allowDecimals: false,
        //     type: 'discrete',
        //     maxValueMargin: 1,
        //     valueMarginsEnabled: true,
        //     // @ts-ignore
        //     defaulVisualRange:{
        //     //   startValue: 2000,
        //       //   endValue: 2020,
        //       length: 5
        //     }
        //   }}
      >
        <Series
          valueField="oranges"
          argumentField="day"
          //   valueField={curRegions[0]}
          name={curRegions[0]}
          //   type="bar"
          color="#1dff0040"
        />
        <Series
          valueField="apples"
          argumentField="day"
          //   valueField={curRegions[0]}
          name={curRegions[0]}
          //   type="bar"
          color="#1dff0040"
        />
        {/* <Series
          argumentField="year"
          valueField={curRegions[2]}
          name={curRegions[2]}
          type="bar"
        /> */}
        <ArgumentAxis
          type="discrete"
          visualRange={{
            startValue: range[0],
            endValue: range[1],
          }}
        >
          <Label
            wordWrap="none"
          />
        </ArgumentAxis>
        <Legend visible={false} />
      </DxChart>
      <RangeSlider
        min={2000}
        max={2020}
        defaultValue={[2005, 2009]}
        onValueChanged={(val)=>setRange(val.value)}
      />
    </div>
  );
};

export default GrowthChart;