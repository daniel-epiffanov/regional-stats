import { FC, useEffect, useState } from 'react'
import { ValueChangedEvent } from 'devextreme/ui/lookup'
import LookUpItem from './LookUpItem'
import { useGeneralDataContext } from '../../context/GeneralDataContext'
import { useSelectionsContext } from '../context/selectionsContext'
import useSubSectionData from './queries/useSubSectionData'
import styles from './styles/index.module.scss'

type Props = Readonly<{}>


const LookUp: FC<Props> = (props) => {
	const { statMainSectionNames } = useGeneralDataContext()
	const { selectionsHandler, selectedMainSectionName, selectedSubSectionName } = useSelectionsContext()

	// const [subSectionNames, setSubSectionNames] = useState<string[] | null>(null)

	const mainSectionNames = statMainSectionNames
		.map(statMainSectionName => statMainSectionName.name)

	const mainSectionChangeHandler = (e: ValueChangedEvent) => {
		selectionsHandler({ selectedMainSectionName: e.value })
	}
	const subSectionChangeHandler = (e: ValueChangedEvent) => {
		selectionsHandler({ selectedSubSectionName: e.value })
	}

	const { loading, error, data } = useSubSectionData()

	const subSectionNames = data && data.statSubSectionNames && data.statSubSectionNames.map(subSectionName => subSectionName.name)
	const subSectionChildrenNames = data && data.statSubSectionNames && data.statSubSectionNames.find(subSectionName => subSectionName.name === selectedSubSectionName)?.children?.map(subSectionChildName=> subSectionChildName.name)


	useEffect(() => {
		console.log({ data })
		console.log({ subSectionNames })
	}, [data, subSectionNames])


	return (
		<div className={styles['root']}>
			<p>Разделы: </p>
			<LookUpItem items={mainSectionNames} valueChangeHandler={mainSectionChangeHandler} />
			{subSectionNames && (
				<>
				<p> / </p>
				<LookUpItem
				items={subSectionNames}
				valueChangeHandler={subSectionChangeHandler}
				isDefaultOpened
				/>
				</>
			)}
			{subSectionChildrenNames && (
			<>
			<p> / </p>
				<LookUpItem
					items={subSectionChildrenNames}
					isDefaultOpened
					/>
					</>
			)}
		</div>
	)
}

export default LookUp
