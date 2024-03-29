import { FC } from 'react';
import LogoSvg from '../../../assets/logo.svg';
import { LOGO_TEXT } from '../../../config/constants';
import styles from './Logo.module.scss';

const Logo: FC = () => (
  <div className={styles['root']}>
    <img
      className={styles['img']}
      src={LogoSvg}
      alt="logo"
    />
    <div className={styles['text']}>
      <h1 data-testid="text">{LOGO_TEXT}</h1>
    </div>
  </div>
);

export default Logo;
