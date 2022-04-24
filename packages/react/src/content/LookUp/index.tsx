import { FC } from 'react'
import { useGeneralDataContext } from '../../context/GeneralDataContext'
import LookUpItem from './LookUpItem'

type Props = Readonly<{}>

const LookUp: FC<Props> = (props) => {
	const { statMainSectionNames, statRegionNames } = useGeneralDataContext()
	const statMainSectionNamesArray = statMainSectionNames
		.map(statMainSectionName => statMainSectionName.name)

	const b = [...statRegionNames]
	return (
		<div>
			<LookUpItem items={statMainSectionNamesArray} />
			<LookUpItem items={b} />
		</div>
	)
}

export default LookUp
