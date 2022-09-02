import { Slider, Tooltip, Label } from 'devextreme-react/slider';
import { NativeEventInfo } from 'devextreme/events';
import { ValueChangedInfo } from 'devextreme/ui/editor/editor';
import dxSlider from 'devextreme/ui/slider';
import { FC } from 'react';
import { useMapContext } from '../../../../context/MapContext';
import styles from './YearSlider.module.scss';

function format(value: number) {
  console.log({value});
  return '200';
}
  

const YearSlider: FC = () => {
  const {curYear, changeCurYear} = useMapContext();
  const yearChangeHandler = (e: NativeEventInfo<dxSlider> & ValueChangedInfo) => {
    const newCurYear = e.value;
    if(typeof newCurYear === 'number') {
      changeCurYear(newCurYear);
    }
  };
  return (
    <div className={styles['root']}>
      <p>{curYear}</p>
      <Slider
        min={2000}
        max={2020}
        defaultValue={curYear}
        onValueChanged={yearChangeHandler}>
        <Label visible={true} position="bottom" />
        <Tooltip enabled={true} position="bottom" format={format} />
      </Slider>
    </div>
  );
};

export default YearSlider;