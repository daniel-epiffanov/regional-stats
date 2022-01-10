import themes from 'devextreme/ui/themes'
import { DEFAULT_THEME } from '../config/constants'

const setLocalStorageTheme = () => {
	themes.current(window.localStorage.getItem('dx-theme') || DEFAULT_THEME)
}

export default setLocalStorageTheme
