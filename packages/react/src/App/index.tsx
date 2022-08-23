import Main from './Main';
import CustomApolloProvider from '../context/CustomApolloProvider';
import { PrefetchedValuesProvider } from '../context/PrefetchedValuesContext';
import setLocalStorageTheme from '../devExtremeHelpers/setLocalStorageTheme';
import { MenuProvider } from '../context/MenuContext';
import Header from './Header';
import { StatDataProvider } from '../context/StatDataContext';

setLocalStorageTheme();

const App = () => (
  <CustomApolloProvider>
    <PrefetchedValuesProvider>
      <MenuProvider>
        <StatDataProvider>
          <Header />
          <Main />
        </StatDataProvider>
      </MenuProvider>
    </PrefetchedValuesProvider>
  </CustomApolloProvider>
);

export default App;
