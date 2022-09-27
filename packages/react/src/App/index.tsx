import { CategoriesMenuProvider } from '../context/CategoriesMenuContext';
import CustomApolloProvider from '../context/CustomApolloProvider';
import { RegionNamesProvider } from '../context/RegionNamesContext';
import setInitialTheme from '../helpers/setInitialTheme';
import CategoriesMenu from './CategoriesMenu';
import Header from './Header';
import Main from './Main';

setInitialTheme();

const App = () => {
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
