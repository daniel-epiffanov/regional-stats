import { DEFAULT_THEME } from '../config/theme';

const getCurTheme = () => {
  const curTheme = window.localStorage.getItem('dx-theme') || DEFAULT_THEME;
  return curTheme;
};

export default getCurTheme;
