import { FC } from 'react'
import { useGeneralDataContext } from '../../context/GeneralDataContext'
import styles from './styles/index.module.scss'
import { Popup, Position } from 'devextreme-react/popup';
import { useToggle } from 'react-use'
import Content from './Content'

type Props = Readonly<{}>

const Menu: FC<Props> = (props) => {
	const { statMainSectionNames } = useGeneralDataContext()

	const mainSectionNames = statMainSectionNames
		.map(statMainSectionName => statMainSectionName.name)

	const renderContent = () => {
    return <Content mainSectionNames={mainSectionNames} />;
	}

	const [isPopupVisible, toggleIsPopupVisible] = useToggle(false)

	return (
		<div className={styles.root}>
			<div id="menu123" onClick={()=> toggleIsPopupVisible()} style={{display: "flex", gap: 5, alignItems: "center"}}>
				<h3>Население</h3>
				<i className="dx-icon-chevronright"/>
				<h3>Валовый региональный продукт</h3>
				<i className="dx-icon-chevronright"/>
				<h3>Регион</h3>
			</div>

			<Popup
				id="popup"
				contentRender={renderContent}
				visible={isPopupVisible}
				closeOnOutsideClick
				onHiding={() => toggleIsPopupVisible()}
				maxWidth={850}
				dragEnabled={false}
				title="Выберите категорию"
				showCloseButton
				height="50vh"
			>
				<Position
					at="left bottom"
					my="left top"
					of="#menu123"
				/>
      </Popup>

		</div>
	)
}

export default Menu
