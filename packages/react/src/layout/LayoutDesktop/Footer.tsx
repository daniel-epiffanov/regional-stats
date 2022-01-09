import styles from './styles/Header.module.scss'

const Footer = () => {
	return (
		<div className={styles.root}>
			<span>
				author&apos;s github:
				{' '}
				<a
					href="https://github.com/daniel-epiffanov"
					target="_blank"
					rel="noreferrer"
				>
					https://github.com/daniel-epiffanov
				</a>
			</span>
		</div>
	)
}

export default Footer
