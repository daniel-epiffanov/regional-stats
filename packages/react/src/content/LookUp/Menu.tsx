import { FC, useState } from 'react'
import { StatSubSectionNames } from '../../../../../sharedTypes/gqlQueries'
import List from './List'
import getSubSectionNamesData from './queries/getSubSectionNamesData'
import styles from './styles/LookUpItem.module.scss'
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

	const mainSectionChangeHandler = async (newValue: string) => {
		const subSectionNamesData = await getSubSectionNamesData(newValue)
		if (subSectionNamesData) setSubSectionNames(subSectionNamesData)
		setEditValues({ mainSectionName: newValue })
	}

	return (
		<div className={styles['root']}>
			<div>
					<List
						items={mainSectionNames}
						valueChangeHandler={mainSectionChangeHandler}
					/>
					{subSectionNames && (
						<>
							<i className="dx-icon-chevronright"/>
							<List
								items={subSectionNames.map(subSectionName => subSectionName.name)}
								// valueChangeHandler={subSectionChangeHandler}
							/>
						</>
					)}
				</div>
		</div>
	)
}

export default Menu
