import { FC } from 'react';
import CancelBtn from './CancelBtn';
import styles from './Controls.module.scss';
import RegionTypeBtn from './RegionTypeBtn';
import YearSlider from './YearSlider';

const Controls: FC = () => {
  return (
    <div className={styles['root']}>
      <CancelBtn />
      <RegionTypeBtn />
      <YearSlider />
    </div>
  );
};

export default Controls;