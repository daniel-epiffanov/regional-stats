import { FC } from 'react';
import { useYearsContext } from '../../../../context/YearsContext';
import styles from './TooltipContent.module.scss';
import _ from 'lodash';
import { useAnnualStatsContext } from '../../../../context/AnnualStatsContext';

type Props = Readonly<{
  regionName: string,
}>

const TooltipContent: FC<Props> = (props) => {
  const {
    regionName,
  } = props;
  
  const {years, curYear} = useYearsContext();
  const {getAnnualDataItem, getAnnualStatsItem} = useAnnualStatsContext();

  const annualStatsItem = getAnnualStatsItem(regionName);
  const annualDataItem = getAnnualDataItem(regionName, curYear);

  if(!annualStatsItem) return null;

  const {measure, regionFlagUrl} = annualStatsItem;

  const {prettyValue, regionRank, annualGrowthPercent, totalGrowthPercent} = annualDataItem || {};
  
  return (
    <div className={styles['root']}>
      <div className={styles['title-container']}>
        <img
          className={styles['img']}
          src={regionFlagUrl}
          alt={regionName}
          width={160}
          height={80}
        />
        <div>
          <h4 className={styles['title']}>{_.truncate(regionName, {length: 30})}</h4>
          <p className={styles['value']}>{prettyValue || 'Нет данных'}</p>
          <p className={styles['measure']}>{measure}</p>
        </div>
      </div>
      <div className={styles['indicators-container']}>
        <div>
          <p>{regionRank || '-'}</p>
          <p>место в рейтнге</p>
        </div>
        <div>
          <p>{annualGrowthPercent || annualGrowthPercent === 0 ? annualGrowthPercent : '-'} %</p>
          <p>годовой рост показателя</p>
        </div>
        <div>
          <p>{totalGrowthPercent || totalGrowthPercent === 0 ? totalGrowthPercent : '-'} %</p>
          <p>общий рост показателя с {years[0]} года</p>
        </div>
      </div>
    </div>
  );
};

export default TooltipContent;