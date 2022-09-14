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



  const formatHandler = (curRegionName: string) => {
    return (value: number) => {
      const dataItem = statData[curRegionName]?.yearValues.find(dataItem => dataItem.value === value);
      // console.log({testValue: value});
      return dataItem?.prettyValue || '';
    };
  };

  return (
    <div>
      {/* <h3>{statData[curRegionNames[0]].name}</h3>
      <p>{statData[curRegionNames[0]].parentMeasure}</p>
      <p>{statData[curRegionNames[0]].measure}</p> */}
      <DxChart
        dataSource={test}
        size={{
          height: 450,
          width: 450,
        }}
        palette={['#3eaaf5', '#eeacc6', 'red']}
        title={statData[curRegionNames[0]].name}
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
              format={formatHandler(curRegionName)}
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
            // text={statData[curRegionNames[0]].measure}
          />
        </ArgumentAxis>
        <Legend verticalAlignment="bottom" orientation="horizontal" horizontalAlignment="center"/>
      </DxChart>
    </div>
  );
};

export default Chart;