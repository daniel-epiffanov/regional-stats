import { FC } from 'react';
import DxVectorMap, {
  Layer,
  Tooltip,
  Border,
  Font,
  ControlBar,
  Background,
  Label
} from 'devextreme-react/vector-map';
import _ from 'lodash';
import { ClickEvent } from 'devextreme/viz/vector_map';
import styles from './VectorMap.module.scss';
import { useMapContext } from '../../../context/MapContext';
import { useRegionNamesContext } from '../../../context/RegionNamesContext';
import { BOUNDS, CENTER, MAX_ZOOM_FACTOR, ZOOM_FACTOR } from '../../../config/map';
import { useAnnualStatsContext } from '../../../context/AnnualStatsContext';
import { useYearsContext } from '../../../context/YearsContext';
import TooltipContent from './TooltipContent';
import { PALETTE } from '../../../config/theme';

const VectorMap: FC = () => {
  const { coordsPolygons, coordsPoints } = useMapContext();
  const {addCurRegionNames, curRegionNames} = useRegionNamesContext();
  const { getAnnualDataItem, getAnnualStatsItem } = useAnnualStatsContext();
  const {curYear} = useYearsContext();
  // const {addCurRegionNames, curRegionNames, mapRegionCoords} = useMapContext();
  // const statRating = useFetchStatRating();

  // const [colorGroups] = useState<ReadonlyArray<number> | null>(
  //   [0, 3, 10, 40, 70, 80, 82],
  // );

  function customizeLayer(elements: any) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const regionName = element.attribute('regionName');
      const annualDataItem = getAnnualDataItem(regionName, curYear);
      if(!annualDataItem) return null;
      element.attribute('value', annualDataItem.value);
      element.attribute('regionRank', annualDataItem.regionRank);
      if (curRegionNames.includes(regionName)) {
        element.selected(true);
      }
    }
  }


  const mapClickHandler = (e: ClickEvent) => {
    if (!e.target) return;
    const regionName = e.target.attribute('regionName');
    addCurRegionNames(regionName);
  };

  const contentRender = (element: Readonly<{
    attribute: (arg: string) => string | number
  }>) => <TooltipContent regionName={`${element.attribute('regionName')}`} />;

  // const customizeText = (args: { end: number, start: number, index: number }) => {
  //   const { end, start, index } = args;
  //   const formattedStart = bigNumberFormatter(start);
  //   const formattedEnd = bigNumberFormatter(end);
  //   const percent = ((index * 2) / 10) * 100;
  //   const isLowestGroup = percent === 0;
  //   const isHighestGroup = percent === 100;
  //   if (isLowestGroup) return `<b>low</b> (${formattedStart} - ${formattedEnd})`;
  //   if (isHighestGroup) return `<b>high</b> (${formattedStart} - ${formattedEnd})`;

  //   return `${percent}%`;
  // };

  // const curRegionCoords = useCurRegionMarkers();

  return (
    <div className={styles['root']}>
      <DxVectorMap
        id="vectorMap"
        onClick={mapClickHandler}
        center={CENTER}
        zoomFactor={ZOOM_FACTOR}
        // zoomingEnabled={false}
        maxZoomFactor={MAX_ZOOM_FACTOR}
        bounds={BOUNDS}
        // onSelectionChanged={selectionHandler}
      >
        <Background borderColor="transparent"/>
        <ControlBar enabled={false} />
        <Layer
          dataSource={{
            type: 'FeatureCollection',
            features: coordsPolygons,
          }}
          type="area"
          customize={customizeLayer}
          selectionMode="multiple"
          name="regions"
          colorGroupingField="place"
          // colorGroups={colorGroups}
          palette={PALETTE}
          selectedBorderWidth={1}
          selectedBorderColor="white"
        >
          <Label enabled dataField="regionName">
            <Font size={10} />
          </Label>
        </Layer>
        <Tooltip
          enabled
          contentRender={contentRender}
          // customizeTooltip={customizeTooltip}
        >
          <Border visible />
          <Font color="#fff" />
        </Tooltip>

        <Layer
          dataSource={{
            type: 'FeatureCollection',
            features: curRegionNames.map(regionName => {
              return coordsPoints.find(coordsPoint => coordsPoint.properties.regionName === regionName);
            }),
          }}
          type="marker"
          elementType="image"
          dataField="regionFlagUrl"
          size={60}>
          {/* <Label dataField="regionName">
            <Font size={8} />
          </Label> */}
        </Layer>
        {/* <Layer
          dataSource={{
            type: 'FeatureCollection',
            features: coordsPoints,
          }}
          borderColor="#fff"
          // type="marker"
          // elementType="image"
          // dataField="regionFlagUrl"
          // size={10}
        >
          <Label dataField="regionName">
            <Font size={8} />
          </Label>
        </Layer> */}
        {/* <Layer
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
        </Legend> */}
      </DxVectorMap>
    </div>
  );
};

export default VectorMap;