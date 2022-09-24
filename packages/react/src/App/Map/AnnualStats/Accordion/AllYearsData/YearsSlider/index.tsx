import { FC } from 'react';
import styles from './YearsSlider.module.scss';
import { RangeSlider } from 'devextreme-react';
import { ValueChangedEvent } from 'devextreme/ui/range_slider';
import { useYearsRangeContext } from '../../../../../../context/YearsRangeContext';


const YearsSlider: FC = () => {
  const {yearsRange, changeYearsRange} = useYearsRangeContext();

  const yearChangeHandler = (e: ValueChangedEvent) => {
    const newCurYear = e.value;
    const abs = Math.abs(newCurYear[1] - newCurYear[0]);
    if(abs > 12) {
      if(newCurYear[0] < yearsRange[0]) {
        changeYearsRange([yearsRange[0] - 1, yearsRange[1] - 1]);
        e.component.repaint();
        return;
      } else {
        return changeYearsRange([yearsRange[0] + 1, yearsRange[1] + 1]);
      }
    }
    changeYearsRange(newCurYear);
  };


  return (
    <div className={styles['root']}>
      <p className={styles['value']}>{yearsRange[0]}</p>
      <div className={styles['slider-container']}>
        <RangeSlider
          min={2000}
          max={2020}
          defaultValue={yearsRange}
          onValueChanged={yearChangeHandler}
          value={yearsRange as number[]}
        />
      </div>
      <p className={styles['value']}>{yearsRange[1]}</p>
    </div>
  );
};

export default YearsSlider;
