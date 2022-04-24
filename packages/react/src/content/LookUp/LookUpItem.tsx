import { FC } from 'react'
import { Lookup, DropDownOptions } from 'devextreme-react/lookup'
import { useGeneralDataContext } from '../../context/GeneralDataContext'

type Props = Readonly<{
	items: string[]
}>

const LookUpItem: FC<Props> = ({ items }) => {
	return (
		<div>
			<Lookup
				searchEnabled
				items={items}
				defaultValue={items[0]}
			>
				<DropDownOptions showTitle={false} />
			</Lookup>
		</div>
	)
}

export default LookUpItem
