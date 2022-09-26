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


  const {
    prettyValue,
    annualGrowthPercent,
    regionRank,
    totalGrowthPercent
  } = annualDataItem || {};
  const {parentMeasure, measure} = annualStatsItem || {};
  // if(!annualStatsItem || !annualDataItem) return null;
  const firstYear = annualStatsItem?.annualData[0].year;

  return (
    <div className={`${styles['root']} ${rootClassName}`}>
      <div className={styles['indicator-container']}>
        <span className={styles['indicator']}>{prettyValue || '-'}</span>
        <span>{parentMeasure}</span>
        <span>{measure}</span>
      </div>
      <div className={styles['indicator-container']}>
        <span className={styles['indicator']} style={{
          color: getPercentColor(annualGrowthPercent || 0)
        }}>{annualGrowthPercent || annualGrowthPercent === 0 ? annualGrowthPercent : '-'}%</span>
        <span>годовой рост показателя</span>
      </div>
      <div className={styles['indicator-container']}>
        <span className={styles['indicator']}>{regionRank || '-'}</span>
        <span>место в рейтинге</span>
      </div>
      <div className={styles['indicator-container']}>
        <span className={styles['indicator']} style={{
          color: getPercentColor(totalGrowthPercent || 0)
        }}>{totalGrowthPercent || totalGrowthPercent === 0 ? totalGrowthPercent : '-'}%</span>
        <span>общий рост показателя с {firstYear} года</span>
      </div>
    </div>
  );
};

export default CurRegionSingleRegion;