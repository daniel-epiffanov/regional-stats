import { FC } from 'react';
import styles from './Card.module.scss';

type Props = Readonly<{
    percent: number,
    mean: number,
    year: number
}>

const Card: FC<Props> = (props) => {
  const {
    percent,
    mean,
    year
  } = props;

  let borderColor = percent > 0 ? '#00800075' : '#ff00007a';
  if (percent === 0) borderColor = '#e2e2e2';

  return (
    <div className={styles['root']} key={year}>
      <div className={styles['line']} style={{	borderColor }} />
      <div className={styles['content']}>
        <p className={styles['percent']}>{percent > 0 ? '+' : '-'} {Math.abs(percent)} %</p>
        <p className={styles['mean']}>mean {Math.floor(mean || 0)} млн. $</p>
        <p className={styles['year']}>{year}</p>
      </div>
    </div>
  );
};

export default Card;