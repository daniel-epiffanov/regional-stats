/* eslint-disable import/extensions */
import { Chart } from 'devextreme-react';
import {
  ArgumentAxis, AxisLabel, Font, Grid, Label, Legend, Series, Tooltip, ValueAxis,
} from 'devextreme-react/chart';
import { FC } from 'react';
import { useCurValuesContext } from '../../context/CurValuesContext';

type Props = Readonly<{
	dataSource: Readonly<{
		region: string,
		value: number,
	}>[]
}>

const TopRegionChart: FC<Props> = ({ dataSource }) => {
  const { curStatData } = useCurValuesContext();
  if (!curStatData) return null;

  return (
    <div>
      <Chart
        title="Bottom regions"
        id="chart"
        dataSource={dataSource}
        rotated
        size={{
          height: 50,
          width: 130,
        }}
      >
        <ValueAxis>
          <AxisLabel visible={false} />
          <Grid visible={false} />
        </ValueAxis>

        <ArgumentAxis>
          <AxisLabel
            visible
            // position="right"
            indentFromAxis={3}
            // textOverflow="ellipsis"
            // component={() => {
            // 	return (<div>
            // 		<h1>yo</h1>
            // 	</div>)
            // }}
            // customizeText={(arg: any) => {
            // 	console.log({arg})
            // 	return `<h1 style="pointer-events: none;">${arg.value}</h1>`
            // }}
          >
            <Font
              color="black"
              size={10}
            />
          </AxisLabel>
        </ArgumentAxis>

        <Legend visible={false} />

        <Tooltip enabled />
        <Series
          // valueField="region"
          // argumentField="value"
          valueField="value"
          argumentField="region"
          name="My oranges"
          type="bar"
          color="green"
        >
          {/* <ValueAxis /> */}
          {/* <Label
					position="column"
					visible
					// position="outside"
					// rotationAngle={45}
					// verticalOffset={-200}
					// horizontalOffset={650}
					// alignment="right"
					// template={(a: any)=> {

					// 	console.log({a})

					// 	return <h1>{a.argumentText}</h1>
					// }}
					textOverflow
					customizeText={(a: any)=> {

						console.log({a})

						return `<h1 class="yo">${a.argumentText}</h1>`
					}}
					/> */}
        </Series>
      </Chart>
    </div>
  );
};

export default TopRegionChart;
