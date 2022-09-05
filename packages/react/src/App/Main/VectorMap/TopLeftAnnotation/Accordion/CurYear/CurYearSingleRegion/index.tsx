import { FC } from 'react';
import { useMapContext } from '../../../../../../../context/MapContext';
import { useStatDataContext } from '../../../../../../../context/StatDataContext';
import useYearValue from '../../../../../../../context/StatDataContext/useYearValue';
import styles from './CurYearSingleRegion.module.scss';

const CurYearSingleRegion: FC = ()  => {
  const {statData, getPrettyValueByYear} = useStatDataContext();
  const {curRegionNames, curYear} = useMapContext();

  if(!statData || !statData[curRegionNames[0]]) return null;
  const curRegionName = curRegionNames[0];
  const yearValue = useYearValue(curRegionNames[0], curYear);

  if(!yearValue) return null;

  console.log({yearValue});

  return (
    <div className={styles['root']}>
      <div>
        <span className={styles['big']}>{getPrettyValueByYear(curRegionName, curYear)}</span>
        <span>{statData[curRegionName].parentMeasure}</span>
        <span>{statData[curRegionName].measure}</span>
      </div>
      <div>
        <span className={styles['big']} style={{
          color: yearValue.percent <= 0 ? 'red' : '#90ee91'
        }}>{yearValue.percent}%</span>
        <span>годовой рост показателя</span>
      </div>
    </div>
  );
};

export default CurYearSingleRegion;