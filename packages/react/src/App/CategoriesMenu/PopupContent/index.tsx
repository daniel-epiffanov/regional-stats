import { FC, useEffect } from 'react';
import { useDebounce } from 'react-use';
import { useCategoriesMenuContext } from '../../../context/CategoriesMenuContext';
import DxCustomList from '../../../dxCustomComponents/DxCustomList';
import styles from './PopupContent.module.scss';

type Props = Readonly<{
	hidePopup: () => void
}>

const PopupContent: FC<Props> = ({hidePopup}) => {
  const {
    mainCategoryNames,
    subCategoryNames,
    subSubCategoryNames,
    changeCurMainCategoryName,
    changeCurSubCategoryName,
    changeCurSubSubCategoryName
  } = useCategoriesMenuContext();

  const changeCurSubCategoryNameHandler = async (newValue: string) => {
    const subSubCategoryNames = await changeCurSubCategoryName(newValue);
    if(!subSubCategoryNames) hidePopup();
  };
  const changeCurSubSubCategoryNameHandler = (newValue: string) => {
    hidePopup();
    changeCurSubSubCategoryName(newValue);
  };

  if (!mainCategoryNames) return <p data-testid="no-data-text">Пожалуйста, подождите</p>;

  return (
    <div className={styles['root']}>
      <DxCustomList items={mainCategoryNames} valueChangeHandler={changeCurMainCategoryName} />

      <i
        className="dx-icon-chevronright"
        data-testid="dx-icon-chevronright"
        style={{
          opacity: subCategoryNames ? 1 : 0
        }}
      />
      <DxCustomList
        items={subCategoryNames || []}
        valueChangeHandler={changeCurSubCategoryNameHandler}
      />

      <i
        className="dx-icon-chevronright"
        data-testid="dx-icon-chevronright"
        style={{
          opacity: subSubCategoryNames ? 1 : 0
        }}
      />
      <DxCustomList
        items={subSubCategoryNames || []}
        valueChangeHandler={changeCurSubSubCategoryNameHandler}
      />
    </div>
  );
};

export default PopupContent;
