import Main from './Main';
import CustomApolloProvider from '../context/CustomApolloProvider';
import { PrefetchedValuesProvider } from '../context/PrefetchedValuesContext';
import setLocalStorageTheme from '../devExtremeHelpers/setLocalStorageTheme';
import { CurValuesProvider } from '../context/CurValuesContext';
import Header from './Header';

setLocalStorageTheme();

const App = () => (
  <CustomApolloProvider>
    <PrefetchedValuesProvider>
      <CurValuesProvider>
        <Header />
        <Main />
      </CurValuesProvider>
    </PrefetchedValuesProvider>
  </CustomApolloProvider>
);

export default App;
