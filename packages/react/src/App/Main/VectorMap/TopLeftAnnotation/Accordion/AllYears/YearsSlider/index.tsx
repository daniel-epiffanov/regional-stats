import { Slider } from 'devextreme-react/slider';
import { NativeEventInfo } from 'devextreme/events';
import { ValueChangedInfo } from 'devextreme/ui/editor/editor';
import dxSlider from 'devextreme/ui/slider';
import { FC, useState } from 'react';
import { useMapContext } from '../../../../../../../context/MapContext';
import styles from './YearsSlider.module.scss';
import { RangeSlider } from 'devextreme-react';
import { ValueChangedEvent } from 'devextreme/ui/range_slider';
import { useYearsRangeContext } from '../../../../../../../context/YearsRangeContext';

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

const YearsSlider: FC = () => {
  const {curYear, changeCurYear} = useMapContext();

  const {yearsRange, changeYearsRange} = useYearsRangeContext();

  const yearChangeHandler = (e: ValueChangedEvent) => {
    const newCurYear = e.value;
    const abs = Math.abs(newCurYear[1] - newCurYear[0]);
    if(abs > 12) {
      if(newCurYear[0] < yearsRange[0]) {
        changeYearsRange([yearsRange[0] - 1, yearsRange[1] - 1]);
        // e.component.beginUpdate();
        e.component.repaint();
        // e.component._refresh();
        return;
      } else {
        // e.component.beginUpdate();
        return changeYearsRange([yearsRange[0] + 1, yearsRange[1] + 1]);
      }
    }
    console.log({newCurYear});
    changeYearsRange(newCurYear);
    // eslint-disable-next-line no-debugger
    // debugger;
  };

  // const optionChangeHandler: OptionChangeHandler = (e) => {
  //   console.log(e);
  //   if((e.name === 'isActive' && e.value === false) || e.name === 'value') {
  //     changeCurYear(sliderValue);
  //   }
  // };


  return (
    <div className={styles['root']}>
      <p className={styles['value']}>{yearsRange[0]}</p>
      <div className={styles['slider-container']}>
        <RangeSlider
          min={2000}
          max={2020}
          defaultValue={yearsRange}
          onValueChanged={yearChangeHandler}
          // @ts-ignore
          value={yearsRange}
          // onOptionChanged={optionChangeHandler}
        >
          {/* <Label visible={true} position="bottom" /> */}
        </RangeSlider>
      </div>
      <p className={styles['value']}>{yearsRange[1]}</p>
    </div>
  );
};

export default YearsSlider;