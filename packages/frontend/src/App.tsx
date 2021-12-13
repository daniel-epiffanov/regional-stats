import './styles/App.module.scss'
import themes from 'devextreme/ui/themes'
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom'
import Home from './pages/Home/Home'
import CustomApolloProvider from './providers/CustomApolloProvider'

themes.current(window.localStorage.getItem('dx-theme') || 'material.blue.light')

const App = () => (
	<CustomApolloProvider>
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</Router>
	</CustomApolloProvider>
)

export default App
