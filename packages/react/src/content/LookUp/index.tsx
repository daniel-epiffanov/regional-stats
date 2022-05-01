import { FC, useEffect, useState } from 'react'
import { ValueChangedEvent } from 'devextreme/ui/lookup'
import LookUpItem from './LookUpItem'
import { useGeneralDataContext } from '../../context/GeneralDataContext'
import { useSelectionsContext } from '../context/curValuesContext'
import useSubSectionData from './queries/useSubSectionData'
import styles from './styles/index.module.scss'

type Props = Readonly<{}>


const LookUp: FC<Props> = (props) => {
	const { statMainSectionNames } = useGeneralDataContext()
	const { setCurValues: selectionsHandler, curMainSectionName: selectedMainSectionName, curSubSectionName: selectedSubSectionName } = useSelectionsContext()

	const [editValues, setEditValues] = useState<Readonly<{curMainSectionName?: string | null, isBeingEdited: boolean}>>({isBeingEdited: false, curMainSectionName: null})

	const mainSectionNames = statMainSectionNames
		.map(statMainSectionName => statMainSectionName.name)

	const mainSectionChangeHandler = (e: ValueChangedEvent) => {
		setEditValues({isBeingEdited: true, curMainSectionName: e.value})
		// selectionsHandler({ selectedMainSectionName: e.value })
	}
	// const subSectionChangeHandler = (e: ValueChangedEvent) => {
	// 	selectionsHandler({ curSubSectionName: e.value })
	// }

	const { loading, error, data } = useSubSectionData()

	const subSectionNames = data && data.statSubSectionNames && data.statSubSectionNames.map(subSectionName => subSectionName.name)
	const subSectionChildrenNames = data && data.statSubSectionNames && data.statSubSectionNames.find(subSectionName => subSectionName.name === selectedSubSectionName)?.children?.map(subSectionChildName=> subSectionChildName.name)


	// useEffect(() => {
	// 	console.log({ data })
	// 	console.log({ subSectionNames })
	// }, [data, subSectionNames])

	// if(editValues.isBeingEdited) return (
	// 	<div className={styles['root']}>
	// 		<LookUpItem items={mainSectionNames} valueChangeHandler={mainSectionChangeHandler} />
	// 	</div>
	// )


	return (
		<div className={styles['root']}>
			<LookUpItem items={mainSectionNames} valueChangeHandler={mainSectionChangeHandler} />
			{/* {subSectionNames && (
				<>
				<p> / </p>
				<LookUpItem
				items={subSectionNames}
				valueChangeHandler={subSectionChangeHandler}
				isDefaultOpened
				/>
				</>
			)} */}
			{/* {subSectionChildrenNames && (
			<>
			<p> / </p>
				<LookUpItem
					items={subSectionChildrenNames}
					isDefaultOpened
					/>
					</>
			)} */}
		</div>
	)
}

export default LookUp
