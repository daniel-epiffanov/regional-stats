import { FC } from 'react'
import {List as DxList } from 'devextreme-react/list';

type Props = Readonly<{
	items: string[],
	valueChangeHandler?: (newValue: string) => void,
}>

const List: FC<Props> = ({ items, valueChangeHandler }) => {

	return (
		<div>

			<DxList
				width={250}
				dataSource={items}
				selectionMode="single"
				scrollingEnabled
				showScrollbar="always"
				height={350}
				onSelectionChanged={(e) => {
					console.log({e})
					const item = e.addedItems[0]
					return valueChangeHandler && valueChangeHandler(item)
				}}
			>
      </DxList>
		</div>
	)
}

export default List
