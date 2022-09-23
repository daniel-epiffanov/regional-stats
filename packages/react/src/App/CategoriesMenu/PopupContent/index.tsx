import { FC } from 'react';
import { useCategoriesMenuContext } from '../../../context/CategoriesMenuContext';
import DxCustomList from '../../../dxCustomComponents/DxCustomList';
import styles from './PopupContent.module.scss';

const PopupContent: FC = () => {
  const {
    mainCategoryNames,
    subCategoryNames,
    subSubCategoryNames,
    changeCurMainCategoryName,
    changeCurSubCategoryName,
    changeCurSubSubCategoryName
  } = useCategoriesMenuContext();

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
        valueChangeHandler={changeCurSubCategoryName}
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
        valueChangeHandler={changeCurSubSubCategoryName}
      />
    </div>
  );
};

export default PopupContent;
