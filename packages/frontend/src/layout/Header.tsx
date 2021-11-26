import React from 'react'
import themes from 'devextreme/ui/themes'
import { Toolbar, Item } from 'devextreme-react/toolbar'
// import { Switch } from 'devextreme-react/switch'
import notify from 'devextreme/ui/notify'
import styles from './styles/Header.module.scss'
import Logo from './Logo'
// import Search from '../Search'

// const autocompleteOptions = {
// 	dataSource: [
// 		'Afghanistan',
// 		'Albania',
// 	],
// 	placeHodler: 'suh',
// }

const chageThemeHundler = () => {
	const curTheme = window.localStorage.getItem('dx-theme')
	const nextTheme = curTheme === 'material.blue.light' ? 'material.blue.dark' : 'material.blue.light'
	window.localStorage.setItem('dx-theme', nextTheme)
	window.location.reload()
}

const ToolBar = () => {
	// React.useEffect(() => {
	// 	themes.current(theme)
	// }, [theme])

	const chageThemeButtonOptions = {
		icon: `fas fa-${window.localStorage.getItem('dx-theme') === 'material.blue.light' ? 'sun' : 'moon'}`,
		onClick: (e: any) => {
			chageThemeHundler()
		},
	}

	const GBtn = () => (
		<div>
			<div
				id="g_id_onload"
				data-client_id="722567747657-cqqvh0k99k565sieicr27bdvhecd023v.apps.googleusercontent.com"
				// data-login_uri="https://localhost:3000/login"
				data-callback="handleCredentialResponse"
				data-auto_prompt="false"
			/>
			<div
				className="g_id_signin"
				data-type="standard"
				data-size="large"
				data-theme="outline"
				data-text="sign_in_with"
				data-shape="rectangular"
				data-logo_alignment="left"
			/>
		</div>
	)

	return (
		<div className={styles.root}>
			<Toolbar
				// onItemRendered={onInitializedHandler}
				className={styles.root}
			>
				<Item
					location="before"
					widget="dxButton"
					// options={backButtonOptions}
					// text="Росстат"
					render={Logo}
				/>
				{/* <Item
					location="after"
					// widget="dxAutocomplete"
					render={Search}
					locateInMenu="auto"
				/> */}
				<Item
					location="after"
					widget="dxButton"
					options={chageThemeButtonOptions}
				// locateInMenu="auto"
				// text="Dark"
				// render={ThemeSwitch}
				/>
				{/* <Item
					location="after"
					// widget="dxButton"
					// options={chageThemeButtonOptions}
					locateInMenu="auto"
					text="Карта"
				/> */}
				<Item
					location="after"
					// widget="dxButton"
					// options={chageThemeButtonOptions}
					locateInMenu="auto"
					text="Data API"
				/>
				<Item
					location="after"
					widget="dxButton"
					// options={backButtonOptions}
					// text="Росстат"
					render={GBtn}
				/>
			</Toolbar>
		</div>
	)
}

export default ToolBar
