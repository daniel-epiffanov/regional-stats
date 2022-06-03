import { FC } from 'react'
import { ValueChangedEvent } from 'devextreme/ui/lookup'
import styles from './styles/LookUpItem.module.scss'
import {
	List as DxList
} from 'devextreme-react/list';
import { EventInfo } from 'devextreme/events';
import dxList from 'devextreme/ui/list';
import { SelectionChangedInfo } from 'devextreme/ui/drop_down_editor/ui.drop_down_list';

type Props = Readonly<{
	items: string[],
	valueChangeHandler?: (newValue: string, element: HTMLElement, offsetTop: number) => void,
	isDefaultOpened?: boolean
}>

const List: FC<Props> = ({ items, valueChangeHandler, isDefaultOpened }) => {

	return (
		<div className={styles['root']}>

			<DxList
				width={250}
				dataSource={items}
				// ={(e) => console.log({e})}
				selectionMode="single"
				scrollingEnabled
				// searchEnabled
				height={350}
				onSelectionChanged={(e) => {
					console.log({e})
					const item = e.addedItems[0]
					// @ts-ignore
					const index = e.component._getIndexByKey(item)
					// @ts-ignore
					const element = e.component.getItemElementByFlatIndex(index)[0]
					const offsetTop = element.offsetTop - 4
					return valueChangeHandler && valueChangeHandler(item, element, offsetTop)
				}}
			>
                {/* Configuration goes here */}
      </DxList>
		</div>
	)
}

export default List
