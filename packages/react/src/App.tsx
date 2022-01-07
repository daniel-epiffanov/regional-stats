import './styles/App.module.scss'
import themes from 'devextreme/ui/themes'
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom'
import Home from './pages/HomePage'
import CustomApolloProvider from './context/CustomApolloProvider'
import { SimpleQueriesProvider } from './context/simpleQueriesContext'

themes.current(window.localStorage.getItem('dx-theme') || 'material.blue.light')

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
