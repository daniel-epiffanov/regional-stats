import { FC } from 'react';
import { useYearsContext } from '../../../../context/YearsContext';
import styles from './TooltipContent.module.scss';
import _ from 'lodash';

type Props = Readonly<{
  regionName: string,
  regionFlagUrl: string,
  prettyValue: string,
  measure: string,
  regionRank: number,
  totalGrowthPercent: number,
  annualGrowthPercent: number,
}>

const TooltipContent: FC<Props> = (props) => {
  const {
    regionName,
    regionFlagUrl,
    prettyValue,
    measure,
    regionRank,
    totalGrowthPercent,
    annualGrowthPercent
  } = props;

  const {years} = useYearsContext();
  
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
          <p className={styles['value']}>{prettyValue}</p>
          <p className={styles['measure']}>{measure}</p>
        </div>
      </div>
      <div className={styles['indicators-container']}>
        <div>
          <p>{regionRank}</p>
          <p>место в рейтнге</p>
        </div>
        <div>
          <p>{annualGrowthPercent} %</p>
          <p>годовой рост показателя</p>
        </div>
        <div>
          <p>{totalGrowthPercent} %</p>
          <p>общий рост показателя с {years[0]} года</p>
        </div>
      </div>
    </div>
  );
};

export default TooltipContent;