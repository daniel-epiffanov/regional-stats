import './styles/App.module.scss';
import Home from './Main';
import CustomApolloProvider from '../context/CustomApolloProvider';
import { PrefetchedValuesProvider } from '../context/PrefetchedValuesContext';
import setLocalStorageTheme from '../devExtreme/setLocalStorageTheme';
import { CurValuesProvider } from '../context/CurValuesContext';

setLocalStorageTheme();

const App = () => (
  <CustomApolloProvider>
    <PrefetchedValuesProvider>
      <CurValuesProvider>
        <Home />
      </CurValuesProvider>
    </PrefetchedValuesProvider>
  </CustomApolloProvider>
);

export default App;
