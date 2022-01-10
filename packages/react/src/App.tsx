import './styles/App.module.scss'
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom'
import Home from './pages/HomePage'
import CustomApolloProvider from './context/CustomApolloProvider'
import { SimpleQueriesProvider } from './context/simpleQueriesContext'
import setLocalStorageTheme from './devExtreme/setLocalStorageTheme'

setLocalStorageTheme()

const App = () => (
	<CustomApolloProvider>
		<SimpleQueriesProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>
		</SimpleQueriesProvider>
	</CustomApolloProvider>
)

export default App
