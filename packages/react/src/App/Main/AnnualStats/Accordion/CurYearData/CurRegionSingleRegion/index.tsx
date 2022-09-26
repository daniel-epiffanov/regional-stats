import { FC } from 'react';
import { useAnnualStatsContext } from '../../../../../../context/AnnualStatsContext';
import { useRegionNamesContext } from '../../../../../../context/RegionNamesContext';
import { useYearsContext } from '../../../../../../context/YearsContext';
import getPercentColor from '../getPercentColor';
import styles from './CurRegionSingleRegion.module.scss';

type Props = Readonly<{
  curRegionName: string,
  rootClassName?: string
}>

const CurRegionSingleRegion: FC<Props> = ({
  curRegionName,
  rootClassName
})  => {
  const {getAnnualDataItem, getAnnualStatsItem} = useAnnualStatsContext();
  const {curYear} = useYearsContext();

  const annualDataItem = getAnnualDataItem(curRegionName, curYear);
  const annualStatsItem = getAnnualStatsItem(curRegionName);

  
  // if(!annualStatsItem || !annualDataItem) return null;
  const firstYear = annualStatsItem?.annualData[0].year;

  return (
    <div className={`${styles['root']} ${rootClassName}`}>
      <div className={styles['indicator-container']}>
        <span className={styles['indicator']}>{annualDataItem?.prettyValue || '-'}</span>
        <span>{annualStatsItem?.parentMeasure}</span>
        <span>{annualStatsItem?.measure}</span>
      </div>
      <div className={styles['indicator-container']}>
        <span className={styles['indicator']} style={{
          color: getPercentColor(annualDataItem?.annualGrowthPercent || 0)
        }}>{annualDataItem?.annualGrowthPercent || '-'}%</span>
        <span>годовой рост показателя</span>
      </div>
      <div className={styles['indicator-container']}>
        <span className={styles['indicator']}>{annualDataItem?.regionRank || '-'}</span>
        <span>место в рейтинге</span>
      </div>
      <div className={styles['indicator-container']}>
        <span className={styles['indicator']} style={{
          color: getPercentColor(annualDataItem?.totalGrowthPercent || 0)
        }}>{annualDataItem?.totalGrowthPercent || '-'}%</span>
        <span>общий рост показателя с {firstYear} года</span>
      </div>
    </div>
  );
};

export default CurRegionSingleRegion;