/* eslint-disable no-mixed-spaces-and-tabs */
import { FC, useEffect, useState } from 'react';
import { ScrollView } from 'devextreme-react/scroll-view';
import styles from './DashboarCards.module.scss';
import { useStatDataContext } from '../../../context/StatDataContext';
import getStatYearValuePercents from '../../../queries/fetchStatYearValuePercents';
import { StatYearValuePercents } from '../../../../../../sharedTypes/gqlQueries';
import Card from './Card';

type Props = Readonly<{

}>


const DashboardCards: FC<Props> = () => {
  const {statData} = useStatDataContext();
  // const { statYears } = usePrefetchedValuesContext();
  // const years = statYears.filter(statYear => `${statYear}`.length === 4);
  // const [chosenYears, setChosenYears] = useState([2005, 2010]);

  const [yearValuePercent, setYearValuePercent] = useState<null | StatYearValuePercents>(null);

  useEffect(()=> {
    const getQuery = async () => {
      if(!statData) return;
      const yearValuesPercents = await getStatYearValuePercents(statData['Рязанская область'].yearValues);
      setYearValuePercent(yearValuesPercents);
    };
    getQuery();
  }, [statData]);
  if (!statData) return <p>waiting for data</p>;
  console.log({yearValuePercent});

  if(!yearValuePercent) return <p>waiting for yearValuePercent</p>;

  // console.log({ statData });
  // // console.log({ years });

  
  // const getValuesByYear = (year: number) => {
  //   const values = Object.entries(statData)
  //     .map(([region, data]) => {
  //       const val =  data?.yearValues && data.yearValues.find((yearValue) => yearValue.year === year);
  //       return val?.value;
  //     });
      
  //   // @ts-ignore
  //   const valuesFiltered: number[] = values.filter(yv => !!yv);
      
  //   return valuesFiltered;
  // };

  // console.log({values: getValuesByYear(2007)});

  // // return <p>mock</p>;

  // // @ts-ignore
  // const yearValuesMeans: ({year: number;mean: number;})[] = statYears.map(year => {
  //   const valuesByYear = getValuesByYear(year);
  //   if (!valuesByYear || valuesByYear?.length === 0) return null;
  //   return ({
  //     year,
  //     mean: getMean(valuesByYear),
  //   });
  // })
  //   .filter(yearValuesMean => !!yearValuesMean && !!yearValuesMean.mean);
  // console.log({ yearValuesMeans });

  // const yearValuesPercents = yearValuesMeans.map((yearValue, i) => {
  //   if (i === 0) {
  //     return {
  //       percent: 0,
  //       year: yearValue.year,
  //       mean: yearValue.mean,
  //     };
  //   }
  //   const curYearMean = yearValue.mean;
  //   const prevYearMean = yearValuesMeans[i - 1].mean;
  //   const max = Math.max(curYearMean,	prevYearMean);
  //   const delta = curYearMean - prevYearMean;
  //   const percent = Math.floor((delta * 100) / max);

  //   return {
  //     percent,
  //     year: yearValue.year,
  //     mean: curYearMean,
  //   };
  // });

  // console.log({ yearValuesProcents: yearValuesPercents });


  // // const chartValues = Object.entries(statData)
  // //   .map(curStatEntry => curStatEntry && curStatEntry[1] && curStatEntry[1].yearValues && curStatEntry[1].yearValues)
  // //   .filter(yearValues => Array.isArray(yearValues) && yearValues.length > 0);

  // // const merged: {year: number;
  // // 		// eslint-disable-next-line prefer-spread
  // // 		value: number;}[] = []
  // // 		  // @ts-ignore
  // // 		  .concat.apply([], chartValues);
  // //   // .filter((v, i)=> i < 100);

  // // const rl = getLinearRegression(merged.map(chartValue => ([chartValue.year, chartValue.value])));

  // // const rlf = getLinearRegressionLine(rl);

  // // const merged2 = merged.map(m => ({
  // //   year: m.year,
  // //   value: m.value,
  // //   trendline: rlf(m.year),
  // // }));


  // // const [isRegressionLineShown, toggleIsRegressionLineShown] = useToggle(false);

  return (
    <div className={styles['root']}>

      {/* <h3>Mean annual groth (all regions)</h3> */}
      <ScrollView
        height={115}
        width="100%"
        direction="horizontal"
        showScrollbar="always"
        bounceEnabled
        scrollByContent
      >
        <div className={styles['scroll-content']}>
          {yearValuePercent.map(({ percent, year, value }) => {
            // if (year < chosenYears[0] || year > chosenYears[1]) return null;

            return <Card
              key={year} 
              percent={percent}
              year={year}
              mean={value}/>;
          })}
        </div>
      </ScrollView>

      <ul>
        {/* <li>slope: {rl.b}</li>
        <li>total growth since 2000: 514%</li>
        <li>growth trend: {rl.b > 0 ? 'positive' : 'negative'}</li> */}
        {/* <li><button onClick={() => toggleIsRegressionLineShown()}>show regression line</button></li> */}
        <li>show growth chart</li>
      </ul>

      {/* {isRegressionLineShown && (
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
            dataSource={statYears.map(statYear => ({ year: statYear }))}
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
      )} */}


    </div>
  );
};

export default DashboardCards;
