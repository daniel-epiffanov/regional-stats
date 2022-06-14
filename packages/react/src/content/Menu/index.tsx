import { FC } from 'react'
import { usePrefetchedValuesContext } from '../../context/PrefetchedValuesContext'
import styles from './styles/index.module.scss'
import { useToggle } from 'react-use'
import Content from './Content'
import MenuStructure from './MenuStructure';
import Popup from '../../dxComponents/Popup'


const Menu: FC = () => {
	const { statMainSectionNames } = usePrefetchedValuesContext()

	const [isPopupVisible, toggleIsPopupVisible] = useToggle(false)
	
	const showPopup = () => toggleIsPopupVisible(true)
	const hidePopup = () => toggleIsPopupVisible(false)

	const contentRenderHandler = () => {
		const mainSectionNames = statMainSectionNames
			.map(statMainSectionName => statMainSectionName.name)
		
		return <Content mainSectionNames={mainSectionNames} hidePopup={hidePopup}/>;
	}



	return (
		<div className={styles['root']}>
			<div id="popup-trigger" className={styles['menuStructure']} onClick={showPopup}>
				<MenuStructure />
			</div>

			<Popup
				isVisible={isPopupVisible}
				contentRenderHandler={contentRenderHandler}
				hidingHandler={hidePopup}
				popupTriggerId="#popup-trigger"
			/>
		</div>
	)
}

export default Menu
