import { FC } from 'react';
import DxVectorMap, {
  Layer,
  Tooltip,
  Font,
  ControlBar,
  Background,
  Label,
  Source,
  Legend,
} from 'devextreme-react/vector-map';
import _ from 'lodash';
import { ClickEvent } from 'devextreme/viz/vector_map';
import styles from './VectorMap.module.scss';
import { useMapContext } from '../../../context/MapContext';
import { useRegionNamesContext } from '../../../context/RegionNamesContext';
import { BOUNDS, CENTER, FEDERAL_DISTRICT_COLOR_GROUPS, MAP_PALETTE, MAX_ZOOM_FACTOR, REGIONS_COLOR_GROUPS, ZOOM_FACTOR } from '../../../config/map';
import { useAnnualStatsContext } from '../../../context/AnnualStatsContext';
import { useYearsContext } from '../../../context/YearsContext';
import TooltipContent from './TooltipContent';

type EventElement = Readonly<{
  attribute: (arg: string, toSet?: string | number) => string | number
}>

const VectorMap: FC = () => {
  const { coordsPolygons, coordsPoints } = useMapContext();
  const {addCurRegionNames, curRegionNames, regionType} = useRegionNamesContext();
  const { getAnnualDataItem } = useAnnualStatsContext();
  const {curYear} = useYearsContext();

  // const colorGroups = [1, 6, 15, 30, 45, 60, 65, 82];

  function customizeLayer(elements: ReadonlyArray<EventElement & {
    selected: (isSelected: boolean) => true
  }>) {
    elements.forEach(element=> {
      const regionName = element.attribute('regionName') as string;
      const annualDataItem = getAnnualDataItem(regionName, curYear);
      if(!annualDataItem) return null;
      const regionsRank = annualDataItem.regionRank;
      element.attribute('value', `${annualDataItem.value}`);
      element.attribute('regionRank', `${regionsRank}`);
      if (curRegionNames.includes(regionName)) {
        element.selected(true);
      }
    });
  }


  const mapClickHandler = (e: ClickEvent) => {
    if (!e.target) return;
    const regionName = e.target.attribute('regionName');
    addCurRegionNames(regionName);
  };

  const contentRender = (element: EventElement) => {
    return <TooltipContent regionName={`${element.attribute('regionName')}`} />;
  };

  const customizeText = (args: { end: number, start: number, index: number }) => {
    const { end, start } = args;
    return `${start} место - ${end - 1} место`;
  };

  return (
    <div className={styles['root']}>
      <DxVectorMap
        id="vectorMap"
        onClick={mapClickHandler}
        center={CENTER}
        zoomFactor={ZOOM_FACTOR}
        maxZoomFactor={MAX_ZOOM_FACTOR}
        bounds={BOUNDS}
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
          colorGroupingField="regionRank"
          colorGroups={
            regionType === 'region' ?
              REGIONS_COLOR_GROUPS :
              FEDERAL_DISTRICT_COLOR_GROUPS}
          palette={MAP_PALETTE}
          hoverEnabled
        >
          <Label enabled dataField="regionName">
            <Font size={10} weight={600} />
          </Label>
        </Layer>
        <Tooltip
          enabled
          contentRender={contentRender}
        />

        <Layer
          dataSource={{
            type: 'FeatureCollection',
            features: curRegionNames.map(regionName => {
              return coordsPoints.find(coordsPoint => coordsPoint.properties.regionName === regionName);
            }),
          }}
          type="marker"
          size={40}
          opacity={1}
          color="white"
          borderColor="white"

        />
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
          size={30}
          opacity={1}
        />


        <Legend
          customizeText={customizeText}
        >
          <Source layer="regions" grouping="color" />
        </Legend>
      </DxVectorMap>
    </div>
  );
};

export default VectorMap;