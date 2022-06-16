import { FC, useEffect, useState } from 'react'
import { StatSubSectionNames } from '../../../../../sharedTypes/gqlQueries'
import { usePrefetchedValuesContext } from '../../context/PrefetchedValuesContext'
import { useCurValuesContext } from '../../context/CurValuesContext'
import List from '../../dxComponents/List'
import getStatData from './queries/getStatData'
import getSubSectionNamesData from './queries/getSubSectionNamesData'
import styles from './styles/Content.module.scss'

type Props = Readonly<{
	hidePopup: () => void
}>

type ChosenValues = Readonly<{
	mainSectionName?: string | null,
	subSectionName?: string | null
}>

const Menu: FC<Props> = ({ hidePopup }) => {
	
	const { setCurValues } = useCurValuesContext()
	const { statMainSectionNames, statRegionNames } = usePrefetchedValuesContext()

	
	const [statSubSectionNames, setStatSubSectionNames] = useState<StatSubSectionNames | null>(null)
	const [chosenValues, setChosenValues] = useState<ChosenValues>({})

	const mainSectionChangeHandler = async (newMainSectionName: string) => {
		setChosenValues({ mainSectionName: newMainSectionName })
	}

	useEffect(() => {
		(async () => {
			if(!chosenValues.mainSectionName) return
			const subSectionNamesData = await getSubSectionNamesData(chosenValues.mainSectionName)
			setStatSubSectionNames(subSectionNamesData)
		})()
	}, [chosenValues.mainSectionName])
	

	const subSectionChangeHandler = async (newValue: string) => {
		setChosenValues(oldChosenValues => ({ ...oldChosenValues, subSectionName: newValue }))
		const children = subSectionNames?.find(subSectionName => subSectionName.name === chosenValues.subSectionName)?.children
		const isChildrenExist = Array.isArray(children) && children.length > 0

		if(isChildrenExist) return

		hidePopup()
		setCurValues({ curMenuVals: [chosenValues.mainSectionName || '', newValue] })
		const statData = await getStatData({
			regionNames: statRegionNames,
			mainSectionName: `${chosenValues.mainSectionName}`,
			subSectionName: newValue,
		})
		if (!statData) return

		setCurValues({ curStatData: statData })
	}

	const subSectionChildChangeHandler = async (newValue: string) => {
		const statData = await getStatData({
			regionNames: statRegionNames,
			mainSectionName: `${chosenValues.mainSectionName}`,
			subSectionName: `${chosenValues.subSectionName}`,
			subSectionChildName: newValue
		})
		if (!statData) return
		hidePopup()
		setCurValues({ curStatData: statData })
	}

	const mainSectionNames = statMainSectionNames
		.map(statMainSectionName => statMainSectionName.name)
	const subSectionNames = subSectionNames.map(subSectionName => subSectionName.name)

	return (
		<div className={styles['root']}>
			<List	items={mainSectionNames} valueChangeHandler={mainSectionChangeHandler}/>
			{subSectionNames && (
				<>
					<i className="dx-icon-chevronright"/>
					<List
						items={subSectionNames.map(subSectionName => subSectionName.name)}
						valueChangeHandler={subSectionChangeHandler}
					/>
				</>
			)}
			{subSectionNames && chosenValues.subSectionName && (
				<>
					<i className="dx-icon-chevronright"/>
					<List
						items={subSectionNames.find(subSectionName => subSectionName.name === chosenValues.subSectionName)?.children?.map(subSectionName=> subSectionName.name) || ['']}
						valueChangeHandler={subSectionChildChangeHandler}
					/>
				</>
			)}
		</div>
	)
}

export default Menu
