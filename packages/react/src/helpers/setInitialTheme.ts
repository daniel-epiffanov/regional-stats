import themes from 'devextreme/ui/themes';
import { DEFAULT_THEME } from '../config/theme';

const setInitialTheme = () => {
  const curTheme = window.localStorage.getItem('dx-theme') || DEFAULT_THEME;
  themes.current(curTheme);
  window.localStorage.setItem('dx-theme', curTheme);
};

export default setInitialTheme;
