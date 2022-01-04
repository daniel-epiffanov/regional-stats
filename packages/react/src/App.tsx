import './styles/App.module.scss'
import themes from 'devextreme/ui/themes'
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom'
import Home from './pages/Home'
import CustomApolloProvider from './context/CustomApolloProvider'
import { SimpleQueriesProvider } from './context/simpleQueries'

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
