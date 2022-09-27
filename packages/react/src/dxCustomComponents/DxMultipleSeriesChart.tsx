import { FC } from 'react';
import {
  Chart as DxChart,
  Series,
  ArgumentAxis,
  Legend,
  Label,
  ValueAxis,
  Tooltip,
  Title,
} from 'devextreme-react/chart';
import { GqlRegionNames } from '../../../../sharedTypes/gqlQueries';
import { CHART_PALETTE } from '../config/chart';
import { MAP_PALETTE } from '../config/map';

type Props = Readonly<{
    curRegionNames: GqlRegionNames,
    yearsRange: ReadonlyArray<number>
    dataSource: ReadonlyArray<Readonly<{
        [key: string]: number
    }>>,
    title: string,
    isValueAxisDiscrete?: boolean,
    seriesType: 'bar' | 'line',
    isSeriesLabelVisible?: boolean,
    isValueAxisInverted?: boolean,
    tooltipContentTemplate?: TooltipContentTemplate
}>

type TooltipValue = Readonly<{
  seriesName: string,
  argument: number,
  value: number
}>
export type TooltipContentTemplate = (tooltipValue: TooltipValue) => string

const DxMultipleSeriesChart: FC<Props> = (props) => {
  const {
    curRegionNames,
    yearsRange,
    dataSource,
    title,
    seriesType,
    isValueAxisDiscrete,
    isSeriesLabelVisible,
    tooltipContentTemplate,
    isValueAxisInverted
  } = props;

  return (
    <div>
      <DxChart
        dataSource={dataSource}
        size={{
          height: 400,
          width: 400,
        }}
        palette={MAP_PALETTE as string[]}
        title={title}
      >
        {curRegionNames.map(curRegionName=> (
          <Series
            key={curRegionName}
            argumentField="year"
            valueField={curRegionName}
            name={curRegionName}
            type={seriesType}
          >
            <Label
              visible={isSeriesLabelVisible}
              rotationAngle={270}
            />
          </Series>
        ))}

        <Tooltip
          enabled={true}
          zIndex={1}
          contentTemplate={tooltipContentTemplate}
        />

        <ValueAxis
          type={isValueAxisDiscrete ? 'discrete' : null}
          inverted={isValueAxisInverted}
        />

        <ArgumentAxis
          type="discrete"
          visualRangeUpdateMode="keep"
          visualRange={yearsRange}
          defaultVisualRange={yearsRange}
        >

          {/* <VisualRange
            startValue={yearsRange[0]}
            endValue={yearsRange[1]}
          /> */}
          <Label wordWrap="none" />
          <Title text="год показателя" />
        </ArgumentAxis>
        <Legend verticalAlignment="bottom" orientation="horizontal" horizontalAlignment="center"/>
      </DxChart>
    </div>
  );
};

export default DxMultipleSeriesChart;