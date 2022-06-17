import { FC, useEffect, useState } from 'react'
import { StatSubCategories } from '../../../../../sharedTypes/gqlQueries'
import { usePrefetchedValuesContext } from '../../context/PrefetchedValuesContext'
import { useCurValuesContext } from '../../context/CurValuesContext'
import List from '../../dxComponents/List'
import fetchStatData from './queries/fetchStatData'
import fetchSubCategories from './queries/fetchSubCategories'
import styles from './styles/Content.module.scss'
import useCategories from './hooks/useCategories'

type Props = Readonly<{
	hidePopup: () => void
}>

type MenuValues = Readonly<{
	mainSectionName?: string | null,
	subSectionName?: string | null,
	subSectionChildName?: string | null,
}>



const PopupContent: FC<Props> = ({ hidePopup }) => {
	
	const { setCurValues } = useCurValuesContext()
	const { statMainCategories, statRegionNames } = usePrefetchedValuesContext()

	const {mainCategoriesStr} = useCategories()
	
	const [menuValues, setMenuValues] = useState<MenuValues>({})
	const [statSubCategories, setStatSubCategories] = useState<StatSubCategories | null>(null)

	const mainSectionChangeHandler = async (newMainSectionName: string) => {
		setMenuValues({ mainSectionName: newMainSectionName })
	}

	// useEffect(() => {
	// 	(async () => {
	// 		if(!menuValues.mainSectionName || !menuValues.subSectionName) return
	// 		const children = statSubCategories?.find(subSectionName => subSectionName.name === menuValues.subSectionName)?.children
	// 		const isChildrenExist = Array.isArray(children) && children.length > 0
	// 		if(isChildrenExist) return
	// 		const statData = await getStatData({
	// 			regionNames: statRegionNames,
	// 			mainSectionName: menuValues.mainSectionName,
	// 			subSectionName: menuValues.subSectionName,
	// 		})
	// 		if(!statData) return
	// 		setCurValues({ curStatData: statData })
	// 	})()
	// }, [menuValues.subSectionName])
	

	const subSectionChangeHandler = async (newSubSectionName: string) => {
		setMenuValues(oldChosenValues => ({ ...oldChosenValues, subSectionName: newSubSectionName }))
		hidePopup()
	}

	const subSectionChildChangeHandler = async (newSubSectionChildName: string) => {
		setMenuValues(oldChosenValues => ({ ...oldChosenValues, subSectionChildName: newSubSectionChildName }))
		hidePopup()
	}

	// const subSectionNames = subSectionNames.map(subSectionName => subSectionName.name)

	return (
		<div className={styles['root']}>
			<List	items={mainCategories} valueChangeHandler={mainSectionChangeHandler}/>
			{/* {subSectionNames && (
				<>
					<i className="dx-icon-chevronright"/>
					<List
						items={subSectionNames.map(subSectionName => subSectionName.name)}
						valueChangeHandler={subSectionChangeHandler}
					/>
				</>
			)}
			{subSectionNames && menuValues.subSectionName && (
				<>
					<i className="dx-icon-chevronright"/>
					<List
						items={subSectionNames.find(subSectionName => subSectionName.name === menuValues.subSectionName)?.children?.map(subSectionName=> subSectionName.name) || ['']}
						valueChangeHandler={subSectionChildChangeHandler}
					/>
				</>
			)} */}
		</div>
	)
}

export default PopupContent
