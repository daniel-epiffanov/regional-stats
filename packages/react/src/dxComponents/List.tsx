import { FC } from 'react'
import {List as DxList } from 'devextreme-react/list';

export type Props = Readonly<{
	items: ReadonlyArray<string>,
	valueChangeHandler?: (newValue: string) => void,
}>

const List: FC<Props> = ({ items, valueChangeHandler }) => {

	return (
		<DxList
			width={250}
			dataSource={items}
			selectionMode="single"
			scrollingEnabled
			showScrollbar="always"
			height={350}
			onSelectionChanged={(e) => {
				const item = e.addedItems[0]
				return valueChangeHandler && valueChangeHandler(item)
			}}
		/>
	)
}

export default List
