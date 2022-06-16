import { FC } from 'react'
import { usePrefetchedValuesContext } from '../../context/PrefetchedValuesContext'
import styles from './styles/index.module.scss'
import { useToggle } from 'react-use'
import Content from './Content'
import Trigger from './Trigger';
import Popup from '../../dxComponents/Popup'


const Menu: FC = () => {


	const [isPopupVisible, toggleIsPopupVisible] = useToggle(false)
	
	const showPopup = () => toggleIsPopupVisible(true)
	const hidePopup = () => toggleIsPopupVisible(false)

	const contentRenderHandler = () =>  <Content hidePopup={hidePopup}/>



	return (
		<div className={styles['root']}>
			<div id="popup-trigger" className={styles['menuStructure']} onClick={showPopup}>
				<Trigger />
			</div>

			<Popup
				isVisible={isPopupVisible}
				contentRenderHandler={contentRenderHandler}
				hidingHandler={hidePopup}
				triggerId="#popup-trigger"
			/>
		</div>
	)
}

export default Menu
