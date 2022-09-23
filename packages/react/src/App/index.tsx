// import Main from './Main';
import { CategoriesMenuProvider } from '../context/CategoriesMenuContext';
import CustomApolloProvider from '../context/CustomApolloProvider';
import { MapProvider } from '../context/MapContext';
import { RegionNamesProvider } from '../context/RegionNamesContext';
import setInitialTheme from '../helpers/setInitialTheme';
import CategoriesMenu from './CategoriesMenu';
// import { MenuProvider } from '../context/MenuContext';
import Header from './Header';
import Map from './Map';
import VectorMap from './Map/VectorMap';
// import { StatDataProvider } from '../context/StatDataContext';

setInitialTheme();

const App = () => {
  return(
    <CustomApolloProvider>
      <Header />
      <CategoriesMenuProvider>
        <CategoriesMenu />
      
        <RegionNamesProvider>
          <Map />
        </RegionNamesProvider>
      </CategoriesMenuProvider>
    </CustomApolloProvider>
  );
};

export default App;
