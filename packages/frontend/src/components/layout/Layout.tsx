import ResponsiveBox, {
	Row, Col, Item, Location,
} from 'devextreme-react/responsive-box'

const Layout = () => (
	<ResponsiveBox>
		<Row ratio={1} />
		<Row ratio={2} />
		<Row ratio={0.7} />
		<Col ratio={0.5} screen="md lg" />
		<Col ratio={2} />
		<Col ratio={0.5} screen="md lg" />

		<Item>
			<Location screen="md lg" row={0} col={0} colspan={3} />
			<Location screen="xs sm" row={0} col={0} />
			<div className="header item">
				<p>Header</p>
			</div>
		</Item>

		<Item>
			<Location screen="md lg" row={1} col={1} />
			<Location screen="xs sm" row={1} col={0} />
			<div className="content item">
				<p>Content</p>
			</div>
		</Item>

		<Item>
			<Location screen="md lg" row={1} col={0} />
			<div className="left-side-bar item">
				<p>Left Bar</p>
			</div>
		</Item>

		<Item>
			<Location screen="md lg" row={1} col={2} />
			<div className="right-side-bar item">
				<p>Right Bar</p>
			</div>
		</Item>

		<Item>
			<Location screen="md lg" row={2} col={0} colspan={3} />
			<Location screen="xs sm" row={2} col={0} />
			<footer>
				<div className="footer item">
					<p>Footer</p>
				</div>
			</footer>
		</Item>
	</ResponsiveBox>
)

export default Layout
