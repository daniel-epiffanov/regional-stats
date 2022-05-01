import { FC } from 'react'
import { ValueChangedEvent } from 'devextreme/ui/lookup'
import { Lookup, DropDownOptions } from 'devextreme-react/lookup'

type Props = Readonly<{
	items: string[],
	valueChangeHandler?: (e: ValueChangedEvent) => void,
	isDefaultOpened?: boolean
}>

const LookUpItem: FC<Props> = ({ items, valueChangeHandler, isDefaultOpened }) => {
	return (
		<div>
			<Lookup
				searchEnabled
				items={items}
				defaultValue={items[0]}
				onValueChanged={valueChangeHandler}
				dropDownCentered={false}
				defaultOpened={isDefaultOpened}
			>
				<DropDownOptions
				showTitle={false}
				maxHeight="70vh"
				height="max-content"
				width="30vw"
				/>
			</Lookup>
		</div>
	)
}

export default LookUpItem
