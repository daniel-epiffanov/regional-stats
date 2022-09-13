import { FC } from 'react';
import { useMapContext } from '../../../../../../../context/MapContext';
import { useStatDataContext } from '../../../../../../../context/StatDataContext';
import getPercentColor from '../getPercentColor';
import styles from './CurRegionIndicators.module.scss';

type Props = Readonly<{
  curRegionName: string,
  rootClassName?: string
}>

const CurRegionIndicators: FC<Props> = ({
  curRegionName,
  rootClassName
})  => {
  const {getPrettyValueByYear, getYearValue, getRegionStatData} = useStatDataContext();
  const {curYear} = useMapContext();

  const regionStatData = getRegionStatData(curRegionName);
  
  if(!regionStatData || !curRegionName) return null;
  const yearValue = getYearValue(curRegionName, curYear);

  if(!yearValue) return null;

  return (
    <div className={`${styles['root']} ${rootClassName}`}>
      <div className={styles['indicator-container']}>
        <span className={styles['indicator']}>{getPrettyValueByYear(curRegionName, curYear)}</span>
        <span>{regionStatData.parentMeasure}</span>
        <span>{regionStatData.measure}</span>
      </div>
      <div className={styles['indicator-container']}>
        <span className={styles['indicator']} style={{
          color: getPercentColor(yearValue.percent)
        }}>{yearValue.percent}%</span>
        <span>годовой рост показателя</span>
      </div>
    </div>
  );
};

export default CurRegionIndicators;