import { DARK_THEME_NAME, LIGHT_THEME_NAME } from '../config/constants'

const chageTheme = () => {
	const curTheme = window.localStorage.getItem('dx-theme')
	const nextTheme = curTheme === LIGHT_THEME_NAME ? DARK_THEME_NAME : LIGHT_THEME_NAME
	window.localStorage.setItem('dx-theme', nextTheme)
	window.location.reload()
}

export default chageTheme
