import { Toolbar, Item } from 'devextreme-react/toolbar'
import { FC } from 'react'
import styles from './styles/Header.module.scss'
import Logo from './Logo'
import chageThemeHundler from '../../devExtreme/chageThemeHundler'
import { GITHUB_LINK, TELEGRAM_LINK } from '../../config/constants'

const Header: FC = () => {
	return (
		<div className={styles.root}>
			<Toolbar
				// onItemRendered={onInitializedHandler}
				className={styles.root}
			>
				<Item
					location="before"
					render={Logo}
				/>
				<Item
					location="after"
					widget="dxButton"
					options={{
						text: 'Author\'s GitHub',
						icon: 'fab fa-github',
						onClick: () => {
							window.open(GITHUB_LINK)
						},
					}}
				/>
				<Item
					location="after"
					widget="dxButton"
					options={{
						text: 'Author\'s Telegram',
						icon: 'fab fa-telegram',
						onClick: () => {
							window.open(TELEGRAM_LINK)
						},
					}}
				/>
				<Item
					location="after"
					widget="dxButton"
					options={{
						icon: 'far fa-lightbulb',
						onClick: () => {
							chageThemeHundler()
						},
						text: 'theme',
					}}
				/>
			</Toolbar>
		</div>
	)
}

export default Header
