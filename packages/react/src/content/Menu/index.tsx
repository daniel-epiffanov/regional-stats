import { FC } from 'react'
import { usePrefetchedValuesContext } from '../../context/PrefetchedValuesContext'
import styles from './styles/index.module.scss'
import { useToggle } from 'react-use'
import Content from './PopupContent'
import PopupTriggerContent from './PopupTriggerContent';
import Popup from '../../dxComponents/Popup'
import { List } from 'devextreme-react'


const Menu: FC = () => {
	const [isPopupVisible, toggleIsPopupVisible] = useToggle(false)
	
	const showPopup = () => toggleIsPopupVisible(true)
	const hidePopup = () => toggleIsPopupVisible(false)

	const contentRenderHandler = () =>  <Content hidePopup={hidePopup}/>



	return (
		<div className={styles['root']}>
			<div id="popup-trigger" className={styles['menuStructure']} onClick={showPopup}>
				<PopupTriggerContent />
			</div>

			{/* <List
				width={250}
				dataSource={[{name: '123'}, {name: '584'}]}
				selectionMode="single"
				scrollingEnabled
				showScrollbar="always"
				height={350}
			/> */}

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
