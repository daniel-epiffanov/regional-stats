import './styles/App.module.scss'
import Home from './content'
import CustomApolloProvider from './context/CustomApolloProvider'
import { SimpleQueriesProvider } from './context/simpleQueriesContext'
import setLocalStorageTheme from './devExtreme/setLocalStorageTheme'

setLocalStorageTheme()

const App = () => (
	<CustomApolloProvider>
		<SimpleQueriesProvider>
			<Home />
		</SimpleQueriesProvider>
	</CustomApolloProvider>
)

export default App
