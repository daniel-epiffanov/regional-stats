import { FC } from 'react';
import { List as DxList } from 'devextreme-react/list';
import styles from './DxCustomList.module.scss';
import { ItemClickEvent } from 'devextreme/ui/list';

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
  const itemClickHandler = (e: ItemClickEvent<string, unknown>) => {
    return valueChangeHandler && valueChangeHandler(e.itemData || '');
  };
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
      nextButtonText="Показать ещё"
      onItemClick={itemClickHandler}
    />
  );
};

export default DxCustomList;
