import { FC } from 'react';
import LogoSvg from '../assets/logo.svg';
import { LOGO_TEXT } from '../config/constants';
import styles from './styles/Logo.module.scss';

const Logo: FC = () => (
  <div className={styles.root}>
    <img src={LogoSvg} alt="logo" height="60px" className={styles.img} />
    <div>
      <b className={styles.root}>{LOGO_TEXT}</b>
    </div>
  </div>
);

export default Logo;
