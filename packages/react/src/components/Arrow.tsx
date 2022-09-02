import { FC, useEffect } from 'react';
import styles from './styles/Arrow.module.scss';

interface Props {
	incline?: number
}

const Arrow: FC<Props> = ({ incline }) => {
  // console.log({ incline });

  return (
    <div className={styles.root}>
      <div
        className={styles.line}
        style={{
          transform: `rotateZ(${incline}deg)`,
        }}
      />
    </div>
  );
};

Arrow.defaultProps = {
  incline: 0,
};

export default Arrow;
