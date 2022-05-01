import { FC } from 'react'
import { ValueChangedEvent } from 'devextreme/ui/lookup'
import { Lookup, DropDownOptions } from 'devextreme-react/lookup'
import styles from './styles/LookUpItem.module.scss'

type Props = Readonly<{
	items: string[],
	valueChangeHandler?: (e: ValueChangedEvent) => void,
	isDefaultOpened?: boolean
}>

const LookUpItem: FC<Props> = ({ items, valueChangeHandler, isDefaultOpened }) => {
	return (
		<div className={styles['root']}>
			<Lookup
				searchEnabled
				items={items}
				// defaultValue={items[0]}
				onValueChanged={valueChangeHandler}
				dropDownCentered={false}
				defaultOpened={isDefaultOpened}
				showCancelButton
				// showDataBeforeSearch
				// showDropDownButton
				// showClearButton
				// stylingMode="outlined"
			>
				<DropDownOptions
				showTitle={false}
				maxHeight="90vh"
				height="calc(max-content + 100px)"
				width="30vw"
				/>
			</Lookup>
		</div>
	)
}

export default LookUpItem
