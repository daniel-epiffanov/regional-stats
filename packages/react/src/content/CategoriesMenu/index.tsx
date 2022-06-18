import { FC } from 'react'
import styles from './styles/index.module.scss'
import { useToggle } from 'react-use'
import PopupContent from './PopupContent'
import PopupTriggerContent from './PopupTriggerContent';
import Popup from '../../dxComponents/Popup'


const CategoriesMenu: FC = () => {
	const [isPopupVisible, toggleIsPopupVisible] = useToggle(false)
	
	const showPopup = () => toggleIsPopupVisible(true)
	const hidePopup = () => toggleIsPopupVisible(false)

	const contentRenderHandler = () =>  <PopupContent hidePopup={hidePopup}/>



	return (
		<div className={styles['root']}>
			<div id="popup-trigger" className={styles['menuStructure']} onClick={showPopup}>
				<PopupTriggerContent />
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

export default CategoriesMenu
