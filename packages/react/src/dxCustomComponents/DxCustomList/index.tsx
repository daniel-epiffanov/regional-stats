import { FC } from 'react';
import { List as DxList } from 'devextreme-react/list';
import styles from './DxCustomList.module.scss';

export type Props = Readonly<{
	items: ReadonlyArray<string>,
	valueChangeHandler?: (newValue: string) => void,
}>

const ItemRender = (item: string) => (
  <div>
    <span className={styles['item']}>{item}</span>
  </div>
);

const DxCustomList: FC<Props> = ({ items, valueChangeHandler }) => {
  return (
    <DxList
      noDataText=""
      width={300}
      dataSource={items}
      selectionMode="single"
      scrollingEnabled
      showScrollbar="always"
      height={350}
      itemRender={ItemRender}
      onSelectionChanged={(e) => {
        const item = e.addedItems[0];
        return valueChangeHandler && valueChangeHandler(item);
      }}
    />
  );
};

export default DxCustomList;
