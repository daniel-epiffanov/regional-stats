import { FC, useEffect, useState } from 'react';
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

  useEffect(() => {
    if(yearsRange[0] !== localYearsRange[0] || yearsRange[1] !== localYearsRange[1]) {
      setLocalYearsLange(yearsRange);
    }
  }, [yearsRange]);

  useDebounce(
    () => {
      changeYearsRange(localYearsRange);
    },
    400,
    [localYearsRange]
  );

  const yearChangeHandler = (e: ValueChangedEvent) => {
    const newCurYear = e.value;
    setLocalYearsLange(newCurYear);
  };

  const isOneYearPresentOnly = years.length > 1;

  return (
    <div className={styles['root']}>
      <p className={styles['value']}>{localYearsRange[0]}</p>
      {isOneYearPresentOnly && (
        <>
          <div className={styles['slider-container']}>
            <RangeSlider
              min={years[0]}
              // @ts-ignore
              max={years.at(-1)}
              defaultValue={localYearsRange}
              onValueChanged={yearChangeHandler}
              value={localYearsRange as number[]}
              hoverStateEnabled={false}
              focusStateEnabled={false}
              activeStateEnabled={false}
            />
          </div>
          <p className={styles['value']}>{localYearsRange[1]}</p>
        </>
      )}
    </div>
  );
};

export default YearsSlider;
