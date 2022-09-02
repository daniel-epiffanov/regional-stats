import { FC } from 'react';
import {
  BarGauge, Label, Export, Title, Font,
} from 'devextreme-react/bar-gauge';
import styles from './Gauge.module.scss';

const values = [47];

const format = {
  type: 'percent',
  precision: 1,
};

const customizeText = ({ valueText }: any) => {
  return `${valueText}`;
};

const Gauge: FC = () => {

  return (
    <div className={styles['root']}>
      <BarGauge
        id="gauge"
        startValue={0}
        endValue={100}
        defaultValues={values}
      >
        <Label indent={0} format={format} customizeText={customizeText} />
      </BarGauge>
    </div>
  );
};

export default Gauge;