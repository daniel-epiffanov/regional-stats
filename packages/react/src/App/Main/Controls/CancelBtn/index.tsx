import { Button } from 'devextreme-react';
import { FC } from 'react';
import { useRegionNamesContext } from '../../../../context/RegionNamesContext';

const CancelBtn: FC = () => {
  const {changeCurRegionNames} = useRegionNamesContext();
  const clickHandler = () => {
    changeCurRegionNames([]);
  };
  return (
    <Button
      onClick={clickHandler}
      text="Очистить"
      icon="fa fa-times"
      stylingMode="text"
    />
  );
};

export default CancelBtn;