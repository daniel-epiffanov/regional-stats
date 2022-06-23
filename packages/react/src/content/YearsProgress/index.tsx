import { FC, useState } from 'react';
import {
  mean as getMean,
  linearRegression as getLinearRegression,
  linearRegressionLine as getLinearRegressionLine,
} from 'simple-statistics';
import { ScrollView } from 'devextreme-react/scroll-view';
import { Chart } from 'devextreme-react';
import { CommonSeriesSettings, Series } from 'devextreme-react/chart';
import RangeSelector, { Scale } from 'devextreme-react/range-selector';
import { useToggle } from 'react-use';
import { usePrefetchedValuesContext } from '../../context/PrefetchedValuesContext';
import styles from './styles/idnex.module.scss';
import { useCurValuesContext } from '../../context/CurValuesContext';

type Props = Readonly<{
}>

const RegressionLine: FC<Props> = () => {
  const { curStatData } = useCurValuesContext();
  const { statYears } = usePrefetchedValuesContext();
  const years = statYears.filter(statYear => `${statYear}`.length === 4);

  if (!curStatData) return null;

  console.log({ curStatData });

  const getValuesByYear = (year: number) => {
    const values = Object.entries(curStatData)
      .map(curStatEntry => {
        const val = curStatEntry && curStatEntry[1] && curStatEntry[1].yearValues && curStatEntry[1].yearValues.find((yearValue) => yearValue.year === year);
        return val?.value;
      });

    // @ts-ignore
    const valuesFiltered: number[] = values.filter(yv => !!yv);

    return valuesFiltered;
  };

  // @ts-ignore
  const yearValuesMeans: ({year: number;mean: number;})[] = statYears.map(year => {
    const valuesByYear = getValuesByYear(year);
    if (!valuesByYear || valuesByYear?.length === 0) return null;
    return ({
      year,
      mean: getMean(valuesByYear),
    });
  })
    .filter(yearValuesMean => !!yearValuesMean && !!yearValuesMean.mean);
  console.log({ yearValuesMeans });

  const yearValuesProcents = yearValuesMeans.map((yearValue, i) => {
    if (i === 0) {
      return {
        percent: 0,
        year: yearValue.year,
        mean: yearValue.mean,
      };
    }
    const curYearMean = yearValue.mean;
    const prevYearMean = yearValuesMeans[i - 1].mean;
    const max = Math.max(curYearMean,	prevYearMean);
    const delta = curYearMean - prevYearMean;
    const percent = Math.floor((delta * 100) / max);

    return {
      percent,
      year: yearValue.year,
      mean: curYearMean,
    };
  });

  console.log({ yearValuesProcents });

  const [chosenYears, setChosenYears] = useState([years[10], years[years.length - 1]]);

  const chartValues = Object.entries(curStatData)
    .map(curStatEntry => curStatEntry && curStatEntry[1] && curStatEntry[1].yearValues && curStatEntry[1].yearValues)
    .filter(yearValues => Array.isArray(yearValues) && yearValues.length > 0);

  const merged: {year: number;
			value: number;}[] = []
			// @ts-ignore
			    .concat.apply([], chartValues);
    // .filter((v, i)=> i < 100);

  const rl = getLinearRegression(merged.map(chartValue => ([chartValue.year, chartValue.value])));

  const rlf = getLinearRegressionLine(rl);

  const merged2 = merged.map(m => ({
    year: m.year,
    value: m.value,
    trendline: rlf(m.year),
  }));

  console.log({ statYears });
  console.log({ years });

  const [isRegressionLineShown, toggleIsRegressionLineShown] = useToggle(false);

  return (
    <div className={styles.root}>

      {/* <h3>Mean annual groth (all regions)</h3> */}
      <ScrollView
        height={100}
        width="100%"
        direction="horizontal"
        showScrollbar="always"
        bounceEnabled
        scrollByContent
      >
        <div className={styles['scroll-content']}>
          {yearValuesProcents.map(({ percent, year, mean }) => {
            if (year < chosenYears[0] || year > chosenYears[1]) return null;
            let borderColor = percent > 0 ? '#00800075' : '#ff00007a';
            if (percent === 0) borderColor = '#e2e2e2';

            return (
              <div className={styles.card}>
                <div className={styles['card-line']} style={{	borderColor }} />
                <div className={styles['card-content']}>
                  <p className={styles['card-procent']}>{percent > 0 ? '+' : '-'} {Math.abs(percent)} %</p>
                  <p className={styles['card-mean']}>mean {Math.floor(mean || 0)} млн. $</p>
                  <p className={styles['card-year']}>{year}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollView>

      <ul>
        <li>slope: {rl.b}</li>
        <li>total growth since 2000: 514%</li>
        <li>growth trend: {rl.b > 0 ? 'positive' : 'negative'}</li>
        <li><button onClick={() => toggleIsRegressionLineShown()}>show regression line</button></li>
        <li>show growth chart</li>
      </ul>

      {isRegressionLineShown && (
        <div>
          <Chart
            id="chart"
            dataSource={merged2}
            size={{
              height: 150,
              width: 700,
            }}
          >

            <CommonSeriesSettings
              type="scatter"
            />
            <Series
              valueField="value"
              argumentField="year"
              point={{
                size: 4,
              }}
            />
            <Series
              valueField="trendline"
              argumentField="year"
              type="spline"
              dashStyle="dash"
              width={4}
              hoverMode="none"
              point={{
                visible: false,
              }}
              name="trendline"
            />
          </Chart>

          <RangeSelector
            id="range-selector"
            defaultValue={chosenYears}
            height={80}
            dataSource={years.map(statYear => ({ year: statYear }))}
            dataSourceField="year"
            onValueChanged={(e) => {
              console.log({ e });
              if (!Array.isArray(e.value)) return;
              setChosenYears([
                parseInt(`${e.value[0]}`),
                parseInt(`${e.value[1]}`),
              ]);
            }}
            value={chosenYears}
          >
            <Scale
              valueType="numeric"
              type="discrete"
            />
          </RangeSelector>
        </div>
      )}
    </div>
  );
};

export default RegressionLine;
