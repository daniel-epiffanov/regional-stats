/* eslint-disable import/extensions */
import { Chart } from 'devextreme-react'
import { ArgumentAxis, AxisLabel, CommonSeriesSettings, Font, Grid, Label, Legend, Series, Tooltip, ValueAxis } from 'devextreme-react/chart'
import { FC } from 'react'
import { useCurValuesContext } from '../context/curValuesContext'

type Props = Readonly<{
	// dataSource: Readonly<{
	// 	region: string,
	// 	value: number,
	// }>[]
}>

function generateDataSource() {
  const b1 = random(-100, 100) / 10;
  const b2 = random(-100, 100) / 10;
  let k1 = random(-100, 100) / 10;
  let k2 = random(-100, 100) / 10;
  const ds = [];

  let i;
  let x1;
  let x2;
  let y1;
  let y2;
  let isNegativeDelta;
  let delta1;
  let delta2;

  if (k1 < 0.1 && k1 >= 0) { k1 = 0.1; }
  if (k1 > -0.1 && k1 < 0) { k1 = -0.1; }
  if (k2 < 0.1 && k2 >= 0) { k2 = 0.1; }
  if (k2 > -0.1 && k2 < 0) { k2 = -0.1; }

  const deviation1 = Math.abs(k1 * 8);
  const deviation2 = Math.abs(k2 * 8);
  for (i = 0; i < 30; i += 1) {
    x1 = random(1, 20);
    x2 = random(1, 20);

    isNegativeDelta = random(0, 1) === 0;
    delta1 = deviation1 * Math.random();
    delta2 = deviation2 * Math.random();
    if (isNegativeDelta) {
      delta1 = -delta1;
      delta2 = -delta2;
    }
    y1 = k1 * x1 + b1 + delta1;
    y2 = k2 * x2 + b2 + delta2;

    ds.push({
      x1, y1, x2, y2,
    });
  }
  return ds;
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const dataSource = generateDataSource();

const year = 2007

const RegressionLine: FC<Props> = () => {
	const {curStatData} = useCurValuesContext()
	// console.log({curStatData})
	if(!curStatData) return null

	const newds = Object.entries(curStatData)
		.map(curStatEntry => {
			const val = curStatEntry && curStatEntry[1].yearValues.find((yearValue) => yearValue.year === year)
     	return({
         region:curStatEntry[0],
         val: val?.value
    	})
		})
		.filter((yearValue: any) => !!yearValue && !!yearValue.val)

		console.log({newds})

	return (
		<div>

		<Chart
			id="chart"
			dataSource={newds}
			size={{
				height: 350,
				width: 1000,
			}}
		>
      <CommonSeriesSettings type="scatter" />
      <Series
        valueField="val"
        argumentField="region" />
      {/* <Series
        valueField="y2"
        argumentField="x2" /> */}
    </Chart>
		</div>
	)
}

export default RegressionLine
