import { FC } from 'react';
import styles from './AnnualStats.module.scss';
import Title from './Title';
import { useRegionNamesContext } from '../../../context/RegionNamesContext';
import Accordion from './Accordion';

type Props = Readonly<{

}>

const AnnualStats: FC<Props> = () => {
  const { curRegionNames } = useRegionNamesContext();

  const className = `${styles['root']} dx-theme-background-color`;

  // if (!curRegionNames.length) return null;

  return (
    <div className={className}>
      {!!curRegionNames.length && <Title />}
      <Accordion />
    </div>
  );
};

export default AnnualStats;
