import { FC, useState } from 'react'
import { StatSubSectionNames } from '../../../../../sharedTypes/gqlQueries'
import { useGeneralDataContext } from '../../context/GeneralDataContext'
import { useCurValuesContext } from '../context/curValuesContext'
import List from './List'
import getStatData from './queries/getStatData'
import getSubSectionNamesData from './queries/getSubSectionNamesData'
import styles from './styles/Content.module.scss'

type Props = Readonly<{
	mainSectionNames: string[],
}>

type ChosenValues = Readonly<{
	mainSectionName?: string | null,
	subSectionName?: string | null
}>

const Menu: FC<Props> = ({ mainSectionNames }) => {

	const { setCurValues } = useCurValuesContext()
	const { statMainSectionNames, statRegionNames } = useGeneralDataContext()

	const [chosenValues, setChosenValues] = useState<ChosenValues>({})
	const [subSectionNames, setSubSectionNames] = useState<StatSubSectionNames | null>(null)

	const mainSectionChangeHandler = async (newValue: string) => {
		const subSectionNamesData = await getSubSectionNamesData(newValue)
		if (!subSectionNamesData) return
		setSubSectionNames(subSectionNamesData)
		setChosenValues({ mainSectionName: newValue })
	}

	const subSectionChangeHandler = async (newValue: string) => {
		setChosenValues(oldChosenValues => ({ ...oldChosenValues, subSectionName: newValue }))
		const children = subSectionNames?.find(subSectionName => subSectionName.name === chosenValues.subSectionName)?.children
		const isChildrenExist = Array.isArray(children) && children.length > 0

		if(isChildrenExist) return

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
		setCurValues({ curStatData: statData })
	}



	return (
		<div className={styles['root']}>
					<List
						items={mainSectionNames}
						valueChangeHandler={mainSectionChangeHandler}
					/>
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
