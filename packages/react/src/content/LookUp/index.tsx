import { FC, useEffect, useState } from 'react'
import { ValueChangedEvent } from 'devextreme/ui/lookup'
import LookUpItem from './LookUpItem'
import { useGeneralDataContext } from '../../context/GeneralDataContext'
import { useCurValuesContext } from '../context/curValuesContext'
import getSubSectionNamesData from './queries/getSubSectionNamesData'
import styles from './styles/index.module.scss'
import getStatData from './queries/getStatData'
import { StatSubSectionNames } from '../../../../../sharedTypes/gqlQueries'
import { Tooltip } from 'devextreme-react/tooltip';
import { Popup, Animation, Show, Position } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import { useToggle } from 'react-use'
import List from './List'
import Menu from './Menu'

type Props = Readonly<{}>
type EditValues = Readonly<{
	mainSectionName?: string | null,
	mainSectionElement?: HTMLElement | null,
	offsetTop?: number | null,
	subSectionName?: string | null,
	subSectionChildName?: string | null,
	// isBeingEdited: boolean
}>

const LookUp: FC<Props> = (props) => {
	const { statMainSectionNames, statRegionNames } = useGeneralDataContext()
	const { setCurValues } = useCurValuesContext()

	const [editValues, setEditValues] = useState<EditValues>({})
	const [subSectionNamesData, setSubSectionNamesData] = useState<StatSubSectionNames | null>(null)
	// const [subSectionChildrenNamesData, setSubSectionChildrenNamesData] = useState<string[] | null>(null)

	const mainSectionNames = statMainSectionNames
		.map(statMainSectionName => statMainSectionName.name)

	const mainSectionChangeHandler = async (newValue: string, element: HTMLElement, offsetTop: number) => {
		const subSectionNamesData = await getSubSectionNamesData(newValue)
		if (subSectionNamesData) setSubSectionNamesData(subSectionNamesData)
		console.log({element})
		setEditValues({ mainSectionName: newValue, mainSectionElement: element, offsetTop })
	}
	// const subSectionChangeHandler = async (e: ValueChangedEvent) => {
	// 	const subSectionName: string = e.value

	// 	const subSectionNamesItem = subSectionNamesData?.find(subSectionNamesItem => subSectionNamesItem.name === subSectionName)

	// 	setEditValues(oldEditValues => ({ ...oldEditValues, subSectionName: e.value, isBeingEdited: false }))

	// 	if (subSectionNamesItem?.children && Array.isArray(subSectionNamesItem?.children)) {
	// 		return setSubSectionChildrenNamesData(subSectionNamesItem?.children.map(subSectionNamesItem => subSectionNamesItem.name))
	// 	}

	// 	const statData = await getStatData({
	// 		regionNames: statRegionNames,
	// 		mainSectionName: `${editValues.mainSectionName}`,
	// 		subSectionName: e.value,
	// 	})
	// 	console.log('parent')
	// 	console.log({ statData })
	// 	if (statData) setCurValues({ curStatData: statData })
	// }

	// const subSectionChildChangeHandler = async (e: ValueChangedEvent) => {
	// 	const subSectionChildName: string = e.value

	// 	const statData = await getStatData({
	// 		regionNames: statRegionNames,
	// 		mainSectionName: `${editValues.mainSectionName}`,
	// 		subSectionName: `${editValues.subSectionName}`,
	// 		subSectionChildName,
	// 	})
	// 	console.log('child')
	// 	console.log({ statData })
	// 	if (statData) setCurValues({ curStatData: statData })
	// }

	console.log({subSectionNamesData})

	const renderContent = () => {
		console.log({editValues})
    return <Menu mainSectionNames={mainSectionNames} />;
	}

	const [isPopupVisible, toggleIsPopupVisible] = useToggle(false)

	return (
		<div className={styles.root}>
			{/* {subSectionChildrenNamesData && (
				<>
					<p>/</p>
					<LookUpItem
						items={subSectionChildrenNamesData}
						valueChangeHandler={subSectionChildChangeHandler}
						isDefaultOpened
					/>
				</>
			)} */}

			<div id="menu123" onClick={()=> toggleIsPopupVisible()}>
				hey
			</div>

			<Popup
				id="popup"
				contentRender={renderContent}
				visible={isPopupVisible}
				closeOnOutsideClick
				onHiding={() => toggleIsPopupVisible()}
				maxWidth={800}
				dragEnabled={false}
				title="Выберите категорию"
				showCloseButton
				height="50vh"
				// style={{
				// 	background: "#ffffffd9 !important"
				// }}
			>
				<Position
					at="right bottom"
					my="left top"
					of="#menu123"
				/>


      </Popup>

		</div>
	)
}

export default LookUp
