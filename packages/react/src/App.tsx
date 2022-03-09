import './styles/App.module.scss'
import Home from './content'
import CustomApolloProvider from './context/CustomApolloProvider'
import { GeneralDataProvider } from './context/GeneralDataContext'
import setLocalStorageTheme from './devExtreme/setLocalStorageTheme'

setLocalStorageTheme()

const App = () => (
	<CustomApolloProvider>
		<GeneralDataProvider>
			<Home />
		</GeneralDataProvider>
	</CustomApolloProvider>
)

export default App
