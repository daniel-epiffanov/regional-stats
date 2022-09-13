import { FC } from 'react';
import { useMapContext } from '../../../../../../context/MapContext';
import { useStatDataContext } from '../../../../../../context/StatDataContext';
import styles from './SingleRegion.module.scss';

type Props = Readonly<{
    curRegionName: string,
}>

const SingleRegion: FC<Props> = ({curRegionName}) => {
  const {curYear} = useMapContext();
  const {statData} = useStatDataContext();

  if(!statData) return null;

  return (
    <div className={styles['root']}>
      <img
        className={styles['img']}
        src={statData[curRegionName].flag}
        alt="moscow"
        width={150}
        height={80}
      />
      <div className={styles['title']}>
        <h3>{curRegionName}</h3>
        <p>{curYear}</p>
      </div>
    </div>
  );
};

export default SingleRegion;