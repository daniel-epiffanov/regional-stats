import { FC, useEffect, useState } from 'react'
import { ValueChangedEvent } from 'devextreme/ui/lookup'
import LookUpItem from './LookUpItem'
import { useGeneralDataContext } from '../../context/GeneralDataContext'
import { useCurValuesContext } from '../context/curValuesContext'
import getSubSectionNamesData from './queries/getSubSectionNamesData'
import styles from './styles/index.module.scss'
import getStatData from './queries/getStatData'
import { StatSubSectionNames } from '../../../../../sharedTypes/gqlQueries'

type Props = Readonly<{}>
type EditValues = Readonly<{
	mainSectionName?: string | null,
	subSectionName?: string | null,
	subSectionChildName?: string | null,
	isBeingEdited: boolean
}>

const LookUp: FC<Props> = (props) => {
	const { statMainSectionNames, statRegionNames } = useGeneralDataContext()
	const { setCurValues } = useCurValuesContext()

	const [editValues, setEditValues] = useState<EditValues>({ isBeingEdited: true })
	const [subSectionNamesData, setSubSectionNamesData] = useState<StatSubSectionNames | null>(null)
	const [subSectionChildrenNamesData, setSubSectionChildrenNamesData] = useState<string[] | null>(null)

	const mainSectionNames = statMainSectionNames
		.map(statMainSectionName => statMainSectionName.name)

	const mainSectionChangeHandler = async (e: ValueChangedEvent) => {
		const newMainSectionName = e.value
		const subSectionNamesData = await getSubSectionNamesData(newMainSectionName)
		if (subSectionNamesData) setSubSectionNamesData(subSectionNamesData)
		// const subSectionNames = subSectionDataResponse.statSubSectionNames
		// .map(statSubSectionName=> statSubSectionName.name)
		setEditValues({ isBeingEdited: true, mainSectionName: newMainSectionName })
	}
	const subSectionChangeHandler = async (e: ValueChangedEvent) => {
		const subSectionName: string = e.value

		const subSectionNamesItem = subSectionNamesData?.find(subSectionNamesItem => subSectionNamesItem.name === subSectionName)

		setEditValues(oldEditValues => ({ ...oldEditValues, subSectionName: e.value, isBeingEdited: false }))

		if (subSectionNamesItem?.children && Array.isArray(subSectionNamesItem?.children)) {
			return setSubSectionChildrenNamesData(subSectionNamesItem?.children.map(subSectionNamesItem => subSectionNamesItem.name))
		}

		const statData = await getStatData({
			regionNames: statRegionNames,
			mainSectionName: `${editValues.mainSectionName}`,
			subSectionName: e.value,
		})
		console.log('parent')
		console.log({ statData })
		if (statData) setCurValues({ curStatData: statData })
	}

	const subSectionChildChangeHandler = async (e: ValueChangedEvent) => {
		const subSectionChildName: string = e.value

		const statData = await getStatData({
			regionNames: statRegionNames,
			mainSectionName: `${editValues.mainSectionName}`,
			subSectionName: `${editValues.subSectionName}`,
			subSectionChildName,
		})
		console.log('child')
		console.log({ statData })
		if (statData) setCurValues({ curStatData: statData })
	}

	return (
		<div className={styles.root}>
			<LookUpItem items={mainSectionNames} valueChangeHandler={mainSectionChangeHandler} />
			{/* {subSectionDataResponse.loading && <Message type="message" text="loading subsections" />} */}
			{subSectionNamesData && (
				<>
					<p>/</p>
					<LookUpItem
						items={subSectionNamesData.map(statSubSectionName => statSubSectionName.name)}
						valueChangeHandler={subSectionChangeHandler}
						isDefaultOpened={!editValues.subSectionName}
					/>
				</>
			)}
			{subSectionChildrenNamesData && (
				<>
					<p>/</p>
					<LookUpItem
						items={subSectionChildrenNamesData}
						valueChangeHandler={subSectionChildChangeHandler}
						isDefaultOpened
					/>
				</>
			)}
		</div>
	)
}

export default LookUp
