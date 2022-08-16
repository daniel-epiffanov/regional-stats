import Main from './Main';
import CustomApolloProvider from '../context/CustomApolloProvider';
import { PrefetchedValuesProvider } from '../context/PrefetchedValuesContext';
import setLocalStorageTheme from '../devExtremeHelpers/setLocalStorageTheme';
import { MenuProvider } from '../context/MenuContext';
import Header from './Header';

setLocalStorageTheme();

const App = () => (
  <CustomApolloProvider>
    <PrefetchedValuesProvider>
      <MenuProvider>
        <Header />
        <Main />
      </MenuProvider>
    </PrefetchedValuesProvider>
  </CustomApolloProvider>
);

export default App;
