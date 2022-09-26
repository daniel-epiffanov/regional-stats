import { Button } from 'devextreme-react';
import { ClickEvent } from 'devextreme/ui/button';
import { FC } from 'react';
import { useRegionNamesContext } from '../../../../context/RegionNamesContext';

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