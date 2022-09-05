import { Slider, Tooltip, Label } from 'devextreme-react/slider';
import { NativeEventInfo } from 'devextreme/events';
import { ValueChangedInfo } from 'devextreme/ui/editor/editor';
import dxSlider from 'devextreme/ui/slider';
import { FC, useState } from 'react';
import { useMapContext } from '../../../../context/MapContext';
import styles from './YearSlider.module.scss';

function format(value: number) {
  return '<div>2000</div>';
}

type OptionChangeHandler = (e: {
  component?: dxSlider | undefined;
  element?: HTMLElement | undefined;
  model?: any;
  name?: string | undefined;
  fullName?: string | undefined;
  value?: any;
}) => void


// TO DO!!

const YearSlider: FC = () => {
  const {curYear, changeCurYear} = useMapContext();

  const [sliderValue, setSliderValue] = useState(curYear);

  const yearChangeHandler = (e: NativeEventInfo<dxSlider> & ValueChangedInfo) => {
    const newCurYear = e.value;
    if(typeof newCurYear === 'number') {
      changeCurYear(newCurYear);
    }
  };

  // const optionChangeHandler: OptionChangeHandler = (e) => {
  //   console.log(e);
  //   if((e.name === 'isActive' && e.value === false) || e.name === 'value') {
  //     changeCurYear(sliderValue);
  //   }
  // };


  return (
    <div className={styles['root']}>
      <div className={styles['slider-container']}>
        <Slider
          min={2000}
          max={2020}
          defaultValue={curYear}
          onValueChanged={yearChangeHandler}
          // onOptionChanged={optionChangeHandler}
        >
          {/* <Label visible={true} position="bottom" /> */}
        </Slider>
      </div>
      <p className={styles['value']}>{sliderValue}</p>
    </div>
  );
};

export default YearSlider;