// import Main from './Main';
import { CategoriesMenuProvider } from '../context/CategoriesMenuContext';
import CustomApolloProvider from '../context/CustomApolloProvider';
import { RegionNamesProvider } from '../context/RegionNamesContext';
import setInitialTheme from '../helpers/setInitialTheme';
import CategoriesMenu from './CategoriesMenu';
// import { MenuProvider } from '../context/MenuContext';
import Header from './Header';
// import { StatDataProvider } from '../context/StatDataContext';

setInitialTheme();

const App = () => {
  return(
    <CustomApolloProvider>
      <RegionNamesProvider>
        {/* <MenuProvider> */}
        {/* <StatDataProvider> */}
        <Header />
        <CategoriesMenuProvider>
          <CategoriesMenu />
        </CategoriesMenuProvider>
        {/* <Main /> */}
        {/* </StatDataProvider> */}
        {/* </MenuProvider> */}
      </RegionNamesProvider>
    </CustomApolloProvider>
  );
};

export default App;
