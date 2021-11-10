import LogoSvg from '../../img/logo.svg'
import styles from '../../styles/ToolBar.module.scss'

const LOGO_TXT = 'рос|стат'.toUpperCase()

const Logo = () => (
	<div className={styles.LogoRoot}>
		<img src={LogoSvg} alt="logo" height="59px" className={styles.logoSvg} />
		<div className="toolbar-label">
			<b className={styles.logoTxt}>{LOGO_TXT}</b>
		</div>
		{/* <h1 className={styles.h1}>{LOGO_TXT}</h1> */}
	</div>
)

export default Logo
