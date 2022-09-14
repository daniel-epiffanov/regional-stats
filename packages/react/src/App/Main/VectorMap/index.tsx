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
import useFetchStatRating from '../../../queryHooks/useFetchStatRating';
import YearSlider from './YearSlider';
import useCurRegionMarkers from './useCurRegionMarkers';

const VectorMap: FC = () => {
  const { statData } = useStatDataContext();
  const {addCurRegionNames, curRegionNames, mapRegionCoords} = useMapContext();
  const statRating = useFetchStatRating();

  const [colorGroups] = useState<ReadonlyArray<number> | null>(
    [0, 3, 10, 40, 70, 80, 82],
  );

  function customizeLayer(elements: any) {
    if(!statData) return null;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const regionName = element.attribute('name');
      element.attribute('value', statData[regionName].yearValues[0].value);
      element.attribute('place', statRating?.find(item=> item.regionName === regionName)?.place || 0);
      if (curRegionNames.includes(regionName)) {
        element.selected(true);
      }
    }
  }


  function onMapClick(e: ClickEvent) {
    if (!e.target) return;
    const regionName = e.target.attribute('name');
    addCurRegionNames(regionName);
  }

  function customizeTooltip(element: any, b: any, c: any) {
    return {
      text: `${element.attribute('name')} ${element.attribute('value')}`,
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
            dataField: 'name',
            font: {
              size: 10,
            },
          }}
          selectedBorderWidth={1}
          selectedBorderColor="white"
        />
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