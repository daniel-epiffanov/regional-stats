import { Slider } from 'devextreme-react/slider';
import { NativeEventInfo } from 'devextreme/events';
import { ValueChangedInfo } from 'devextreme/ui/editor/editor';
import dxSlider from 'devextreme/ui/slider';
import { FC, useState } from 'react';
import { useDebounce } from 'react-use';
import { useYearsContext } from '../../../../context/YearsContext';
import styles from './YearSlider.module.scss';

const YearSlider: FC = () => {
  const {years, curYear, changeCurYear} = useYearsContext();
  const [localCurYear, setLocalCurYear] = useState<number>(curYear);

  useDebounce(
    () => {
      changeCurYear(localCurYear);
    },
    300,
    [localCurYear]
  );

  const yearChangeHandler = (e: NativeEventInfo<dxSlider> & ValueChangedInfo) => {
    const newCurYear = e.value;
    if(typeof newCurYear === 'number') {
      setLocalCurYear(newCurYear);
    }
  };


  return (
    <div className={styles['root']}>
      <div className={styles['slider-container']}>
        <Slider
          min={years[0]}
          max={years[years.length - 1]}
          defaultValue={localCurYear}
          value={localCurYear}
          onValueChanged={yearChangeHandler}
        />
      </div>
      <h3 className={styles['value']}>{localCurYear} год</h3>
    </div>
  );
};

export default YearSlider;