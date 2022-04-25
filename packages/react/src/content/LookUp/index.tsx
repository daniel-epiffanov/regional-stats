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

	const valueChangedEvent = (e: ValueChangedEvent) => {
		// console.log({ value: e.value })
		// console.log({ selectionsHandler })
		// console.log({ selectedMainSectionName })
		// console.log({ selectedSubSectionName })
		// debugger
		selectionsHandler({ selectedMainSectionName: e.value })
	}

	const { loading, error, data } = useSubSectionData()

	const subSectionNames = data && data.statSubSectionNames && data.statSubSectionNames.map(subSectionName => subSectionName.name)


	useEffect(() => {
		console.log({ data })
		console.log({ subSectionNames })
	}, [data, subSectionNames])


	return (
		<div className={styles['root']}>
			<LookUpItem items={mainSectionNames} valueChangeHandler={valueChangedEvent} />
			<p> / </p>
			{subSectionNames && (
				<LookUpItem
					items={subSectionNames}
					valueChangeHandler={valueChangedEvent}
				/>
			)}
		</div>
	)
}

export default LookUp
