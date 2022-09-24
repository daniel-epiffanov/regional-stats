import { FC } from 'react';
import {
  Chart as DxChart,
  Series,
  ArgumentAxis,
  Legend,
  Label,
} from 'devextreme-react/chart';
import { useRegionNamesContext } from '../../../../../../context/RegionNamesContext';
import { useYearsRangeContext } from '../../../../../../context/YearsRangeContext';
import { useAnnualStatsContext } from '../../../../../../context/AnnualStatsContext';
import { useYearsContext } from '../../../../../../context/YearsContext';

const AnnualDataChart: FC = () => {
  const {getAnnualDataItem, getAnnualStatsItem} = useAnnualStatsContext();
  const {curRegionNames} = useRegionNamesContext();
  const {yearsRange} = useYearsRangeContext();
  const {years} = useYearsContext();

  if (curRegionNames.length === 0) return <>yo</>;

  const dataSource = years.map(year => {
    const entries = [
      ['year', year],
      ...curRegionNames.map(curRegionName=>([
        curRegionName,
        getAnnualDataItem(curRegionName, year)?.value
      ]))
    ];
    return Object.fromEntries(entries);
  });

  const formatHandler = (regionName: string) => {
    return (value: number) => {
      const dataItem = getAnnualStatsItem(regionName)?.annualData.find(annualDataItem => annualDataItem.value === value);
      return dataItem?.prettyValue || '';
    };
  };

  const dataItem = getAnnualStatsItem(curRegionNames[0]);

  return (
    <div>
      <DxChart
        dataSource={dataSource}
        size={{
          height: 400,
          width: 400,
        }}
        palette={['#3eaaf5', '#eeacc6', 'red']}
        title={dataItem?.measure}
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
            // text="hey"
          />
        </ArgumentAxis>
        <Legend verticalAlignment="bottom" orientation="horizontal" horizontalAlignment="center"/>
      </DxChart>
    </div>
  );
};

export default AnnualDataChart;