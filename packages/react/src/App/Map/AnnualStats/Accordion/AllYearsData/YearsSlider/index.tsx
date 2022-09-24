import { FC, useState } from 'react';
import styles from './YearsSlider.module.scss';
import { RangeSlider } from 'devextreme-react';
import { ValueChangedEvent } from 'devextreme/ui/range_slider';
import { useYearsRangeContext } from '../../../../../../context/YearsRangeContext';
import { useYearsContext } from '../../../../../../context/YearsContext';
import { useDebounce } from 'react-use';


const YearsSlider: FC = () => {
  const {yearsRange, changeYearsRange} = useYearsRangeContext();
  const {years} = useYearsContext();
  const [localYearsRange, setLocalYearsLange] = useState<ReadonlyArray<number>>(yearsRange);

  useDebounce(
    () => {
      changeYearsRange(localYearsRange);
    },
    400,
    [localYearsRange]
  );  

  const yearChangeHandler = (e: ValueChangedEvent) => {
    const newCurYear = e.value;
    const abs = Math.abs(newCurYear[1] - newCurYear[0]);
    if(abs > 12) {
      if(newCurYear[0] < localYearsRange[0]) {
        setLocalYearsLange([localYearsRange[0] - 1, localYearsRange[1] - 1]);
        e.component.repaint();
        return;
      } else {
        return setLocalYearsLange([localYearsRange[0] + 1, localYearsRange[1] + 1]);
      }
    }
    setLocalYearsLange(newCurYear);
  };


  return (
    <div className={styles['root']}>
      <p className={styles['value']}>{localYearsRange[0]}</p>
      <div className={styles['slider-container']}>
        <RangeSlider
          min={years[0]}
          max={years[years.length - 1]}
          defaultValue={yearsRange}
          onValueChanged={yearChangeHandler}
          value={localYearsRange as number[]}
        />
      </div>
      <p className={styles['value']}>{localYearsRange[1]}</p>
    </div>
  );
};

export default YearsSlider;
