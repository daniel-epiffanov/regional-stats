import { FC, useState } from 'react';
import { useStatDataContext } from '../../../../../../../context/StatDataContext';
import {
  Chart as DxChart,
  Series,
  ArgumentAxis,
  Legend,
  Label,
} from 'devextreme-react/chart';
import { useMapContext } from '../../../../../../../context/MapContext';
import { useYearsRangeContext } from '../../../../../../../context/YearsRangeContext';

const Chart: FC = () => {
  const {statData} = useStatDataContext();
  const {curRegionNames} = useMapContext();
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
    // console.log({test});
    // console.log({entries});
    // console.log({entries2: Object.fromEntries(entries)});
    return Object.fromEntries(entries);
  });
  console.log({test});
  //   console.log({test});


  const formatHandler = (value: any) => {
    const dataItem = statData[curRegionNames[0]]?.yearValues.find(dataItem => dataItem.value === value);
    // console.log({value});
    return dataItem?.prettyValue || '';
  };

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
            <Label
              visible
              rotationAngle={270}
              format={formatHandler}
            />
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
    </div>
  );
};

export default Chart;