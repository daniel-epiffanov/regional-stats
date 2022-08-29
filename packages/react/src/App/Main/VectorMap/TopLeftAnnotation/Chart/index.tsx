import { FC, useState } from 'react';
import { useStatDataContext } from '../../../../../context/StatDataContext';
import {
  Chart as DxChart,
  Series,
  ArgumentAxis,
  Legend,
  Label,
} from 'devextreme-react/chart';
import { RangeSlider } from 'devextreme-react';
import { useMapContext } from '../../../../../context/MapContext';

const Chart: FC = () => {
  const {statData} = useStatDataContext();
  //   const curRegions = ['Рязанская область', 'Тульская область', 'Тамбовская область'];
  const {curRegionNames} = useMapContext();
  const [range, setRange] = useState([2005, 2009]);

  if (!statData || curRegionNames.length === 0) return <>yo</>;

  const getValues = (region: string) => statData[region]?.yearValues.map(yearValue => yearValue.value);
  const getYears = (region: string) => statData[region]?.yearValues.map(yearValue => yearValue.year);

  const allData = curRegionNames.map(curRegion => getValues(curRegion));
  const test = getYears(curRegionNames[0]).map((year, yearIndex) => {
    const entries = [
      ['year', year],
      ...curRegionNames.map((curRegionName, curRegionNameIndex)=>(
        [
          curRegionName,
          allData[curRegionNameIndex][yearIndex]
        ]
      ))
    ];
    console.log({entries});
    console.log({entries2: Object.fromEntries(entries)});
    return Object.fromEntries(entries);
  });

  console.log({test});

  return (
    <div>

      <DxChart
      // id="chart"
      // @ts-ignore
        dataSource={test}
        title={statData[curRegionNames[0]].name}
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
        {curRegionNames.map(curRegionName=> (
          <Series
            key={curRegionName}
            argumentField="year"
            valueField={curRegionName}
            name={curRegionName}
            type="bar"
            // color="#1dff0040"
          />
        ))}
        {/* <Series
          argumentField="year"
          valueField={curRegionNames[2]}
          name={curRegionNames[2]}
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

export default Chart;