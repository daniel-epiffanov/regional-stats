import './styles/App.module.scss'
import themes from 'devextreme/ui/themes'
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom'
import Home from './pages/Home'

// const appMainHeader = 'Росстат'

themes.current(window.localStorage.getItem('dx-theme') || 'material.blue.light')

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>

		</>
	)
}

export default App
