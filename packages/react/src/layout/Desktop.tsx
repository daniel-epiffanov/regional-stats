import { FC } from 'react'
import Header from './Header'
import styles from './styles/Desktop.module.scss'

const Layout: FC = (props) => {
	const { children } = props

	return (
		<div className={styles.root}>
			<header>
				<Header />
			</header>

			<main>
				{children}
			</main>

			<footer>
				<div>
					<p>Footer</p>
				</div>
			</footer>
		</div>
	)
}

export default Layout
