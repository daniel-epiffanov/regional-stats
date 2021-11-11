import ResponsiveBox, {
	Row, Col, Item, Location,
} from 'devextreme-react/responsive-box'
import { FC } from 'react'
import Header from './Header'

const Layout: FC = (props) => {
	const { children } = props

	return (
		<>
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
		</>
	)
}

export default Layout
