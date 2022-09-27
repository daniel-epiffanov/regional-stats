import { DARK_THEME_NAME, DEFAULT_THEME, LIGHT_THEME_NAME } from '../config/theme';
// import themes from 'devextreme/ui/themes';

// const isTestEnv = !!process.env?.JEST_WORKER_ID;

const toggleTheme = () => {
  const curTheme = window.localStorage.getItem('dx-theme') || DEFAULT_THEME;
  if(curTheme === LIGHT_THEME_NAME) {
    window.localStorage.setItem('dx-theme', DARK_THEME_NAME);
    return window.location.reload();
    // return !isTestEnv && themes.current(DARK_THEME_NAME);
  }
  window.localStorage.setItem('dx-theme', LIGHT_THEME_NAME);
  window.location.reload();
  // return !isTestEnv && themes.current(LIGHT_THEME_NAME);
  
};

export default toggleTheme;
