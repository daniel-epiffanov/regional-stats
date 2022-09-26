import { FC } from 'react';
import YearsSlider from './YearsSlider';
import DxMultipleSeriesChart, { TooltipContentTemplate } from '../../../../../dxCustomComponents/DxMultipleSeriesChart';
import { useYearsContext } from '../../../../../context/YearsContext';
import { useRegionNamesContext } from '../../../../../context/RegionNamesContext';
import { useAnnualStatsContext } from '../../../../../context/AnnualStatsContext';
import { useYearsRangeContext } from '../../../../../context/YearsRangeContext';

const tooltipContentTemplateWithPercent: TooltipContentTemplate = (tooltipValue) => {
  return `${tooltipValue.value} %`;
};

const AllYearsData: FC = () => {
  const {years} = useYearsContext();
  const {curRegionNames} = useRegionNamesContext();
  const {getAnnualDataItem, annualStats} = useAnnualStatsContext();
  const {yearsRange} = useYearsRangeContext();
  
  const getDataSource = (
    field: 'regionRank' | 'annualGrowthPercent' | 'totalGrowthPercent' | 'value'
  ) => years.map(year => {
    const entries = [
      ['year', year],
      ...curRegionNames.map(curRegionName=>{
        const annualDataItem = getAnnualDataItem(curRegionName, year);
        if(!annualDataItem) return [];
        return ([
          curRegionName,
          annualDataItem[field],
        ]);
      })
    ];
    return Object.fromEntries(entries);
  });

  const tooltipContentTemplateAnnualData: TooltipContentTemplate = (tooltipValue) => {
    const regionName = tooltipValue.seriesName;
    const year = tooltipValue.argument;
    const annualDataItem = getAnnualDataItem(regionName, year);
    return `${annualDataItem?.prettyValue} ${annualStats[0].measure}`;
  };
  
  return (
    <div>
      <YearsSlider />
      <DxMultipleSeriesChart
        curRegionNames={curRegionNames}
        yearsRange={yearsRange}
        dataSource={getDataSource('value')}
        title={'Статистика по выбранной категории'}
        seriesType="bar"
        tooltipContentTemplate={tooltipContentTemplateAnnualData}
      />
      <DxMultipleSeriesChart
        curRegionNames={curRegionNames}
        yearsRange={yearsRange}
        dataSource={getDataSource('regionRank')}
        title="Место в рейтинге"
        isValueAxisDiscrete
        seriesType="line"
        isSeriesLabelVisible
        isValueAxisInverted
      />
      <DxMultipleSeriesChart
        curRegionNames={curRegionNames}
        yearsRange={yearsRange}
        dataSource={getDataSource('annualGrowthPercent')}
        title="Годовой рост показателя (%)"
        seriesType="bar"
        tooltipContentTemplate={tooltipContentTemplateWithPercent}
      />
      <DxMultipleSeriesChart
        curRegionNames={curRegionNames}
        yearsRange={yearsRange}
        dataSource={getDataSource('totalGrowthPercent')}
        title={`Общий рост показателя c ${years[0]} года (%)`}
        seriesType="bar"
        tooltipContentTemplate={tooltipContentTemplateWithPercent}
      />
    </div>
  );
};
  
export default AllYearsData;