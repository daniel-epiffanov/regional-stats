import { FC } from 'react'
import { ValueChangedEvent } from 'devextreme/ui/lookup'
import { Lookup, DropDownOptions } from 'devextreme-react/lookup'

type Props = Readonly<{
	items: string[],
	valueChangeHandler?: (e: ValueChangedEvent) => void
}>

const LookUpItem: FC<Props> = ({ items, valueChangeHandler }) => {
	return (
		<div>
			<Lookup
				searchEnabled
				items={items}
				defaultValue={items[0]}
				onValueChanged={valueChangeHandler}
			>
				<DropDownOptions showTitle={false} />
			</Lookup>
		</div>
	)
}

export default LookUpItem
