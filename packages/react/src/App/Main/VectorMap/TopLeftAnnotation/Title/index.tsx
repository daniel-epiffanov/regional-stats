import { FC } from 'react';
import { useMapContext } from '../../../../../context/MapContext';
import { useStatDataContext } from '../../../../../context/StatDataContext';
import styles from './Title.module.scss';

const Title: FC = () => {
  const {curRegionNames, curYear} = useMapContext();
  const {statData} = useStatDataContext();

  if(!statData) return null;

  if(curRegionNames.length > 1)return <h2>Режим сравнения</h2>;

  return (
    <div className={styles['root']}>
      <img
        className={styles['img']}
        src={statData[curRegionNames[0]].flag}
        alt="moscow"
        width={150}
        height={80}
      />
      <div className={styles['title']}>
        <h3>{curRegionNames[0]}</h3>
        <p>{curYear}</p>
      </div>
    </div>
  );
};

export default Title;