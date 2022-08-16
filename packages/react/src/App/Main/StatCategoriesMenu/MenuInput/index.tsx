import { FC } from 'react';
import DxCustomList from '../../../../dxCustomComponents/DxCustomList';
import styles from './MenuInput.module.scss';
import useCategories from './useCategories';

type Props = Readonly<{
	// hidePopup: () => void
}>

const MenuInput: FC<Props> = () => {
  const {
    statFirstCategories,
    changeStatFirstCategory,
    statSecondCategories,
    changeStatSecondCategory,
    statThirdCategories,
    changeStatThirdCategory,
  } = useCategories();

  if (!statFirstCategories) return <p data-testid="no-data-text">please, wait</p>;

  return (
    <div className={styles['root']}>
      <DxCustomList items={statFirstCategories} valueChangeHandler={changeStatFirstCategory} />

      <i
        className="dx-icon-chevronright"
        data-testid="dx-icon-chevronright"
        style={{
          opacity: statSecondCategories ? 1 : 0
        }}
      />
      <DxCustomList
        items={statSecondCategories || []}
        valueChangeHandler={changeStatSecondCategory}
      />

      <i
        className="dx-icon-chevronright"
        data-testid="dx-icon-chevronright"
        style={{
          opacity: statThirdCategories ? 1 : 0
        }}
      />
      <DxCustomList
        items={statThirdCategories || []}
        valueChangeHandler={changeStatThirdCategory}
      />
    </div>
  );
};

export default MenuInput;
