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
import { useMapContext } from '../../../../../../../context/MapContext';
import { useYearsRangeContext } from '../../../../../../../context/YearsRangeContext';

const Chart: FC = () => {
  const {statData} = useStatDataContext();
  //   const curRegions = ['Рязанская область', 'Тульская область', 'Тамбовская область'];
  const {curRegionNames} = useMapContext();
  // const [range, setRange] = useState([2005, 2009]);
  const {yearsRange} = useYearsRangeContext();

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
    // console.log({entries});
    // console.log({entries2: Object.fromEntries(entries)});
    return Object.fromEntries(entries);
  });

  //   console.log({test});

  return (
    <div>
      <DxChart
        dataSource={test}
        title={statData[curRegionNames[0]].name}
        size={{
          height: 450,
          width: 450,
        }}
        palette={['#3eaaf5', '#eeacc6', 'red']}
      >
        {curRegionNames.map(curRegionName=> (
          <Series
            key={curRegionName}
            argumentField="year"
            valueField={curRegionName}
            name={curRegionName}
            type="bar"
          >
            <Label visible rotationAngle={270}/>
          </Series>
        ))}
        <ArgumentAxis
          type="discrete"
          visualRange={{
            startValue: yearsRange[0],
            endValue: yearsRange[1],
          }}
        >
          <Label
            wordWrap="none"
          />
        </ArgumentAxis>
        <Legend verticalAlignment="bottom" orientation="horizontal" horizontalAlignment="center"/>
      </DxChart>
      {/* <RangeSlider
        min={2000}
        max={2020}
        defaultValue={[2005, 2009]}
        onValueChanged={(val)=>setRange(val.value)}
      /> */}
    </div>
  );
};

export default Chart;