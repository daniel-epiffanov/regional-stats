// import Main from './Main';
import CustomApolloProvider from '../context/CustomApolloProvider';
import { RegionNamesProvider } from '../context/RegionNamesContext';
import setInitialTheme from '../helpers/setInitialTheme';
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
        {/* <Main /> */}
        {/* </StatDataProvider> */}
        {/* </MenuProvider> */}
      </RegionNamesProvider>
    </CustomApolloProvider>
  );
};

export default App;
