import { FC, useState } from 'react';
import DxVectorMap, {
  Layer,
  Tooltip,
  Border,
  Legend,
  Source,
  Font,
  ControlBar
} from 'devextreme-react/vector-map';
import _ from 'lodash';
import { ClickEvent, SelectionChangedEvent } from 'devextreme/viz/vector_map';
import styles from './VectorMap.module.scss';
import TopLeftAnnotation from './TopLeftAnnotation';
import { useStatDataContext } from '../../../context/StatDataContext';
import { useMapContext } from '../../../context/MapContext';
import bigNumberFormatter from '../../../helpers/bigNumberFormatter';
import useStatRatingQuery from './TopLeftAnnotation/Accordion/CurYear/RegionsRating/useStatRatingQuery';
import YearSlider from './YearSlider';
import useCurRegionMarkers from './useCurRegionMarkers';

// type Props = Readonly<{
// 	regionCoords: RegionCoords
// }>

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

const VectorMap: FC = () => {
  const { statData } = useStatDataContext();
  const {addCurRegionNames, curRegionNames, mapRegionCoords} = useMapContext();
  const statRating = useStatRatingQuery();

  const [colorGroups, setColorGroups] = useState<ReadonlyArray<number> | null>(
    [0, 3, 10, 40, 70, 80, 82],
  );

  function customizeLayer(elements: any) {
    if(!statData) return null;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const regionName = element.attribute('name_ru');
      element.attribute('value', statData[regionName].yearValues[0].value);
      element.attribute('place', statRating?.find(item=> item.regionName === regionName)?.place || 0);
      if (curRegionNames.includes(regionName)) {
        element.selected(true);
      }
    }
  }


  function onMapClick(e: ClickEvent) {
    if (!e.target) return;
    const regionName = e.target.attribute('name_ru');
    addCurRegionNames(regionName);
  }

  function customizeTooltip(element: any, b: any, c: any) {
    return {
      text: `${element.attribute('name_ru')} ${element.attribute('value')}`,
    };
  }

  const customizeText = (args: { end: number, start: number, index: number }) => {
    const { end, start, index } = args;
    const formattedStart = bigNumberFormatter(start);
    const formattedEnd = bigNumberFormatter(end);
    const percent = ((index * 2) / 10) * 100;
    const isLowestGroup = percent === 0;
    const isHighestGroup = percent === 100;
    if (isLowestGroup) return `<b>low</b> (${formattedStart} - ${formattedEnd})`;
    if (isHighestGroup) return `<b>high</b> (${formattedStart} - ${formattedEnd})`;

    return `${percent}%`;
  };

  
  const selectionHandler = (e: SelectionChangedEvent) => {
    // debugger;
    // console.log({ e });
  };

  const curRegionCoords = useCurRegionMarkers();

  return (
    <div className={styles.root}>
      <DxVectorMap
        id="vectorMap"
        onClick={onMapClick}
        zoomFactor={3}
        onSelectionChanged={selectionHandler}
      >
        <ControlBar enabled={false} />
        <Layer
          dataSource={{
            type: 'FeatureCollection',
            features: mapRegionCoords,
          }}
          type="area"
          customize={customizeLayer}
          selectionMode="multiple"
          name="regions"
          colorGroupingField="place"
          colorGroups={colorGroups}
          palette={['#3eaaf5', '#eeacc6', 'red']}
          label={{
            enabled: true,
            dataField: 'name_ru',
            font: {
              size: 10,
            },
          }}
          // selectedColor="white"
          selectedBorderWidth={1}
          selectedBorderColor="white"
        />

        {/* <CurRegionMarkers /> */}
        <Layer
          dataSource={curRegionCoords}
          color="red"
          size={20}
        />

        <Tooltip
          enabled
          customizeTooltip={customizeTooltip}
        >
          <Border visible />
          <Font color="#fff" />
        </Tooltip>

        <Legend customizeText={customizeText}>
          <Source layer="regions" grouping="color" />
        </Legend>
      </DxVectorMap>

      {curRegionNames.length && <TopLeftAnnotation />}
      <YearSlider />
    </div>
  );
};

export default VectorMap;