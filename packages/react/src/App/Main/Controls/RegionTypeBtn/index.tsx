import { Button, Switch } from 'devextreme-react';
import { NativeEventInfo } from 'devextreme/events';
import { ClickEvent } from 'devextreme/ui/button';
import { ValueChangedInfo } from 'devextreme/ui/editor/editor';
import dxSwitch from 'devextreme/ui/switch';
import { FC } from 'react';
import { useRegionNamesContext } from '../../../../context/RegionNamesContext';
import styles from './RegionTypeSwitch.module.scss';

const RegionTypeBtn: FC = () => {
  const {regionType, changeRegionType, changeCurRegionNames} = useRegionNamesContext();
  
  const clickHandler = (e: ClickEvent) => {
    changeCurRegionNames([]);
    changeRegionType(regionType === 'region' ? 'federalDistrict' : 'region');
  };

  return (
    <Button
      onClick={clickHandler}
      text={regionType === 'region' ? 'регионы' : 'федеральные округа'}
      icon="fa fa-toggle-on"
      stylingMode="text"
    />
  );
};

export default RegionTypeBtn;