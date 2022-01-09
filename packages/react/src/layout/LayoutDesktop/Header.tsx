import { Toolbar, Item } from 'devextreme-react/toolbar'
import styles from './styles/Header.module.scss'
import Logo from './Logo'
import chageThemeHundler from '../../devExtreme/chageThemeHundler'
import { LIGHT_THEME_NAME } from '../../config/constants'

const Header = () => {
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
				<Item
					location="before"
					widget="dxButton"
					// options={backButtonOptions}
					// text="Росстат"
					render={Logo}
				/>
				<Item
					location="after"
					widget="dxButton"
					options={{
						icon: `fas fa-${window.localStorage.getItem('dx-theme') === LIGHT_THEME_NAME ? 'sun' : 'moon'}`,
						onClick: (e: any) => {
							chageThemeHundler()
						},
					}}
				/>
			</Toolbar>
		</div>
	)
}

export default Header
