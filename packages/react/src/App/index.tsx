import Main from './Main';
import CustomApolloProvider from '../context/CustomApolloProvider';
import { PrefetchedValuesProvider } from '../context/PrefetchedValuesContext';
import setLocalStorageTheme from '../devExtremeHelpers/setLocalStorageTheme';
import { CurMenuValuesProvider } from '../context/CurMenuValuesContext';
import Header from './Header';

setLocalStorageTheme();

const App = () => (
  <CustomApolloProvider>
    <PrefetchedValuesProvider>
      <CurMenuValuesProvider>
        <Header />
        <Main />
      </CurMenuValuesProvider>
    </PrefetchedValuesProvider>
  </CustomApolloProvider>
);

export default App;
