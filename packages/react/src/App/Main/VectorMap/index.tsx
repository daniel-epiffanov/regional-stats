/* eslint-disable import/extensions */
import React, { FC, useEffect, useState } from 'react';
import VectorMap, {
  Layer,
  Tooltip,
  Border,
  Legend,
  Source,
  Font,
  ControlBar,
  CommonAnnotationSettings,
  Annotation,
  Label,
} from 'devextreme-react/vector-map';
import _ from 'lodash';
import {
  mean as getMean,
  median as getMedian,
  mode as getMode,
  standardDeviation as getStandardDeviation,
  interquartileRange as getInterquartileRange,
} from 'simple-statistics';
import { ClickEvent, SelectionChangedEvent } from 'devextreme/viz/vector_map';
import useCoordsQuery from './hooks/useCoordsQuery';
import Message from '../../../components/Message';
import { useCurMenuValuesContext } from '../../../context/CurMenuValuesContext';
import { RegionCoords } from '../../../../../../sharedTypes/gqlQueries';
import styles from './styles/index.module.scss';
import TopLeftAnnotation from './TopLeftAnnotation';

type Props = Readonly<{
	regionCoords: RegionCoords
}>

const BOUNDS = [71, 97, 45, 26];
const PALLETE = ['#eeacc5', '#db9eba', '#c88fb0', '#b581a5', '#a1739a', '#8e6490', '#7b5685'];

function AnnotationTemplate(annotation: any) {
  const { data } = annotation;
  return (
    <svg className="annotation">
      {/* <image href={getImagePath(data)} width="60" height="40" /> */}
      <rect x={0} y={0} className="border" />
      <text x="70" y="25" className="state">{data.name}</text>
      <text x="0" y="60">
        <tspan className="caption">Capital:</tspan>
        <tspan className="capital" dx="5">{data.capital}</tspan>
        <tspan dy="14" x="0" className="caption">Population:</tspan>
        <tspan className="population" dx="5">{data.population}</tspan>
        <tspan dy="14" x="0" className="caption">Area:</tspan>
        <tspan className="area" dx="5">{data.area}</tspan>
        <tspan dx="5">km</tspan>
        <tspan className="sup" dy="-2">2</tspan>
      </text>
    </svg>
  );
}

const Map: FC<Props> = ({ regionCoords }) => {
  const { curStatData } = useCurMenuValuesContext();

  const [colorGroups, setColorGroups] = useState<ReadonlyArray<number> | null>(
    [326.6, 52907.853489932866, 115397.40348993287, 177886.95348993287, 240376.50348993286, 302866.0534899329, 3971424.9],
  );

  useEffect(() => {
    if (!curStatData) return;
    const test = Object
      .values(curStatData)
      .filter(curStatItem => !!curStatItem)
      .map(curStatItem => {
        return curStatItem?.yearValues[0].value;
      });

    const other = _.concat(...test);

    const min = Math.min(...other);
    const max = Math.max(...other);
    const interquartileRange = getInterquartileRange(other);
    const halfInterquartileRange = interquartileRange / 2;
    const standardDeviation = getStandardDeviation(other);
    const cutStandardDeviation = standardDeviation / 3;
    const mean = getMean(other);
    const median = getMedian(other);
    const mode = getMode(other);

    const newColorSetting = [
      min,
      (mode - min) / 2,
      (mode - min) / 3,
      (mode - min) / 4,
      (mode - min) / 5,
      (mode - min) / 6,
      mode,
      (max - mode) / 6,
      (max - mode) / 5,
      (max - mode) / 4,
      (max - mode) / 3,
      (max - mode) / 2,
      max,
    ];

    setColorGroups(newColorSetting);
    console.log({ newColorSetting });

    // debugger
  }, [curStatData]);

  function customizeLayer(elements: any) {
    // debugger
    if (!curStatData) return;
    elements.forEach((element: any) => {
      const regionName = element.attribute('name_ru');
      curStatData[regionName] && element.attribute('value', curStatData[regionName].yearValues[0].value);
      // if (!isRegionNameInStatistics(regionName)) {
      // 	element.applySettings({ opacity: 0.2 })
      // }
    });
  }

  const { setCurMenuValues: setCurValues, curRegions } = useCurMenuValuesContext();

  function onMapClick(e: ClickEvent) {
    if (!e.target) return;
    const regionName = e.target.attribute('name_ru');
    const value = e.target.attribute('value');

    console.log({ regionName });
    console.log({ value });
    e.target.applySettings({
      selected: true,
      // 'borderWidth': '5px',
      // "borderColor": "black"
    });

    if (curRegions.includes(regionName)) return;
    if (curRegions.length > 2) return setCurValues({ curRegions: [regionName] });
    setCurValues({
      curRegions: [...curRegions, regionName],
    });

    // debugger
    // if (!isRegionNameInStatistics(regionName)) return

    // selectionsHandler({ selectedRegionName: regionName })
  }

  function customizeTooltip(element: any, b: any, c: any) {
    return {
      text: `${element.attribute('name_ru')} ${element.attribute('value')}`,
    };
  }

  // const customizeText = (args: { end: number, start: number, index: number }) => {
  // 	const { end, start, index } = args
  // 	// const formattedStart = bigNumberFormatter(start)
  // 	// const formattedEnd = bigNumberFormatter(end)
  // 	// const percent = ((index * 2) / 10) * 100
  // 	// const isLowestGroup = percent === 0
  // 	// const isHighestGroup = percent === 100
  // 	// if (isLowestGroup) return `<b>low</b> (${formattedStart} - ${formattedEnd})`
  // 	// if (isHighestGroup) return `<b>high</b> (${formattedStart} - ${formattedEnd})`

  // 	return `${percent}%`
  // }

  // const colorGroups = [0, 50, 200, 1000, 5000, 300000, 1000000];

  const markers = {
    type: 'FeatureCollection',
    features: [
      {
        coordinates: [159, 56],
        text: 'New York City',
        value: 8406,
      },
      {
        coordinates: [160, 57],
        text: 'Bangkok',
        value: 8281,
      },
      {
        coordinates: [40.04923925434538, 51.17876373322016],
        text: 'Baghdad',
        value: 7181,
      },
      {
        coordinates: [37.62, 55.75],
        text: 'Moscow',
        value: 12111,
      },
      {
        coordinates: [38.961649341699925, 60.07807077542048],
        text: 'Shanghai',
        value: 24150,
      },
      {
        coordinates: [69.60064097022877, 62.43771004049723],
        text: 'Rio de Janeiro',
        value: 6429,
      },
      {
        coordinates: [40.560076548725455, 54.53531529510556],
        text: 'Cairo',
        value: 8922,
      },
      {
        coordinates: [39, 53],
        text: 'Istanbul',
        value: 14160,
      },
      {
        coordinates: [38, 61],
        text: 'Seoul',
        value: 10388,
      },
    ].map((data) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: data.coordinates,
      },
      properties: {
        text: data.text,
        value: data.value,
        tooltip: `<b>${data.text}</b>\n${data.value}K`,
      },
    })),
  };

  const selectionHandler = (e: SelectionChangedEvent) => {
    debugger;
    console.log({ e });
  };

  return (
    <div className={styles.root}>
      <VectorMap
        id="vectorMap"
        // bounds={BOUNDS}
        onClick={onMapClick}
        // onInitialized={onInitializedHandler}
        zoomFactor={3}
        // height="90vh"
        onSelectionChanged={selectionHandler}
        size={{
          height: 650,
        }}
      >
        <ControlBar enabled={false} />
        <Layer
          dataSource={{
            type: 'FeatureCollection',
            features: regionCoords,
          }}
          type="area"
          customize={customizeLayer}
          selectionMode="multiple"
          name="regions"
          // palette="Violet"
          colorGroupingField="value"
          colorGroups={colorGroups}
          label={{
            enabled: true,
            dataField: 'name_ru',
            font: {
              size: 10,
            },
          }}
          selectedColor="red"

          // borderWidth="2px"
        />

        <Tooltip
          enabled
          customizeTooltip={customizeTooltip}
        >
          <Border visible />
          <Font color="#fff" />
        </Tooltip>

        <Legend>
          <Source layer="regions" grouping="color" />
        </Legend>

        {/* <CommonAnnotationSettings
        type="custom"
        render={AnnotationTemplate}
      >
      </CommonAnnotationSettings>
      {statesData.map((state) => (
        <Annotation
          coordinates={state.coordinates}
          offsetX={state.offsetX}
          offsetY={state.offsetY}
          key={state.data.name}
          data={state.data}
        >
        </Annotation>
      ))
      } */}

        <Layer
          // selectionMode="single"
          dataSource={markers}
          color="red"
          name="bubbles"
          elementType="dot"
          dataField="value"
          minSize={20}
          maxSize={40}
          sizeGroups={[0, 8000, 10000, 50000]}
          opacity="0.8"
        >
          <Label enabled={false} />
        </Layer>
      </VectorMap>

      <TopLeftAnnotation />
    </div>
  );
};

const MapPreloads: FC = () => {
  // graphql response
  const { loading, error, data } = useCoordsQuery();

  if (loading) return <Message type="message" text="Map data is loading." positionId="vector-map-container" />;

  const coordsByRegionType = data?.regionCoords;

  // debugger

  if (error || !data || !coordsByRegionType) return <Message type="error" text="Error while loading the map data." />;

  return <Map regionCoords={coordsByRegionType} />;
};

// const MapPreloads = () => {

// }

export default MapPreloads;
