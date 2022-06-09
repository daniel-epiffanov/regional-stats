import './styles/App.module.scss'
import Home from './content'
import CustomApolloProvider from './context/CustomApolloProvider'
import { PrefetchedValuesProvider } from './context/PrefetchedValuesContext'
import setLocalStorageTheme from './devExtreme/setLocalStorageTheme'

setLocalStorageTheme()

const App = () => (
	<CustomApolloProvider>
		<PrefetchedValuesProvider>
			<Home />
		</PrefetchedValuesProvider>
	</CustomApolloProvider>
)

export default App
