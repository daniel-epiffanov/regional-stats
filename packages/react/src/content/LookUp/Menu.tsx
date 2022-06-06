import { FC, useState } from 'react'
import { StatSubSectionNames } from '../../../../../sharedTypes/gqlQueries'
import List from './List'
import getSubSectionNamesData from './queries/getSubSectionNamesData'
import styles from './styles/Menu.module.scss'

type Props = Readonly<{
	mainSectionNames: string[],
}>

type EditValues = Readonly<{
	mainSectionName?: string | null,
	subSectionName?: string | null,
	subSectionChildName?: string | null,
}>

const Menu: FC<Props> = ({ mainSectionNames }) => {

	const [editValues, setEditValues] = useState<EditValues>({})
	const [subSectionNames, setSubSectionNames] = useState<StatSubSectionNames | null>(null)
	const [subSectionChildrenNamesData, setSubSectionChildrenNamesData] = useState<string[] | null>(null)

	const mainSectionChangeHandler = async (newValue: string) => {
		const subSectionNamesData = await getSubSectionNamesData(newValue)
		if (subSectionNamesData) setSubSectionNames(subSectionNamesData)
		// setEditValues({ mainSectionName: newValue })
	}

	const subSectionChangeHandler = async (newValue: string) => {
		const subSectionName = subSectionNames?.find(subSectionName => subSectionName.name === newValue)

		// setEditValues(oldEditValues => ({ ...oldEditValues, subSectionName: e.value, isBeingEdited: false }))

		// if (subSectionNamesItem?.children && Array.isArray(subSectionNamesItem?.children)) {
		// 	return setSubSectionChildrenNamesData(subSectionNamesItem?.children.map(subSectionNamesItem => subSectionNamesItem.name))
		// }

		// const statData = await getStatData({
		// 	regionNames: statRegionNames,
		// 	mainSectionName: `${editValues.mainSectionName}`,
		// 	subSectionName: e.value,
		// })
		// console.log('parent')
		// console.log({ statData })
		// if (statData) setCurValues({ curStatData: statData })
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
					{subSectionChildrenNamesData && (
						<>
							<p>/</p>
							<List
								items={subSectionChildrenNamesData}
								valueChangeHandler={subSectionChildChangeHandler}
							/>
						</>
					)}

		</div>
	)
}

export default Menu
