import { useWindowSize } from 'react-use';
import { MAX_WINDOW_SIZE_DESKTOP } from '../config/settings';
import { CategoriesMenuProvider } from '../context/CategoriesMenuContext';
import CustomApolloProvider from '../context/CustomApolloProvider';
import { RegionNamesProvider } from '../context/RegionNamesContext';
import setInitialTheme from '../helpers/setInitialTheme';
import CategoriesMenu from './CategoriesMenu';
import Header from './Header';
import Main from './Main';
import styles from './App.module.scss';

setInitialTheme();

const App = () => {
  const {width: windowWidth} = useWindowSize();

  if(windowWidth < MAX_WINDOW_SIZE_DESKTOP) return (
    <div className={styles['no-access-root']}>
      <p>Извините, но данное разрешение экрана пока не поддерживается.</p>
    </div>
  );

  return(
    <CustomApolloProvider>
      <Header />
      <CategoriesMenuProvider>
        <CategoriesMenu />
        <RegionNamesProvider>
          <Main />
        </RegionNamesProvider>
      </CategoriesMenuProvider>
    </CustomApolloProvider>
  );
};

export default App;
