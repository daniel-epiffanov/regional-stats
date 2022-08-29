import { FC, useCallback } from 'react';
import styles from './StatCategoriesMenu.module.scss';
import MenuInput from './MenuInput';
import DxCustomPopup from '../../../dxCustomComponents/DxCustomPopup';
import MenuOutput from './MenuOutput';
import usePopupState from './usePopupState';
import { useMenuContext } from '../../../context/MenuContext';

const StatCategoriesMenu: FC = () => {
  const {isPopupVisible, showPopup, hidePopup} = usePopupState();
  const contentRenderHandler = () => <MenuInput />;
  const {curStatCategories} = useMenuContext();

  const getTitle = useCallback(
    () => {
      if(!curStatCategories.firstCategory) return 'Choose a category';
      if(!curStatCategories.thirdCategory) return `${curStatCategories.firstCategory} | ${curStatCategories.secondCategory}`;
      return `${curStatCategories.firstCategory} | ${curStatCategories.secondCategory} | ${curStatCategories.thirdCategory}`;
    },
    [curStatCategories.firstCategory, curStatCategories.secondCategory, curStatCategories.thirdCategory]
  );

  return (
    <div className={styles.root}>
      <div
        id="popup-trigger"
        className={styles['popup-trigger']}
        onClick={showPopup}
      >
        {!isPopupVisible && <MenuOutput />}
      </div>

      <DxCustomPopup
        isVisible={isPopupVisible}
        contentRenderHandler={contentRenderHandler}
        hidingHandler={hidePopup}
        triggerId="#popup-trigger"
        title={getTitle()}
      />
    </div>
  );
};

export default StatCategoriesMenu;
