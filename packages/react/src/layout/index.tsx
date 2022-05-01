import { FC } from 'react'
import Header from './Header'
import styles from './styles/index.module.scss'

const LayoutDesktop: FC = (props) => {
	const { children } = props

	return (
		<div className={styles['root']}>
			<header>
				<Header />
			</header>

			<main>
				{children}
			</main>
		</div>
	)
}

export default LayoutDesktop
