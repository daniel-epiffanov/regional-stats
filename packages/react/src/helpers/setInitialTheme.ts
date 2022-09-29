import themes from 'devextreme/ui/themes';
import getCurTheme from './getCurTheme';

const setInitialTheme = () => {
  const curTheme = getCurTheme();
  window.localStorage.setItem('dx-theme', curTheme);
  themes.current(curTheme);
};

export default setInitialTheme;
