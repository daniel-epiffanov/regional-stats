import { FC } from 'react';
import styles from './CategoriesMenu.module.scss';
import PopupContent from './PopupContent';
import TriggerContent from './TriggerContent';
import usePopupState from './usePopupState';
import { useCategoriesMenuContext } from '../../context/CategoriesMenuContext';
import DxCustomPopup from '../../dxCustomComponents/DxCustomPopup';
import getTitle from './getTitle';

const CategoriesMenu: FC = () => {
  const {isPopupVisible, showPopup, hidePopup} = usePopupState();
  const {curCategoryNames} = useCategoriesMenuContext();
  const {curMainCategoryName, curSubCategoryName, curSubSubCategoryName} = curCategoryNames;
  return (
    <div className={styles.root}>
      <div
        id="popup-trigger"
        className={styles['popup-trigger']}
        onClick={showPopup}
      >
        <TriggerContent />
      </div>

      <DxCustomPopup
        isVisible={isPopupVisible}
        contentRender={() =><PopupContent hidePopup={hidePopup}/>}
        hidingHandler={hidePopup}
        triggerId="#popup-trigger"
        title={getTitle(
          curMainCategoryName, curSubCategoryName, curSubSubCategoryName
        )}
      />
    </div>
  );
};

export default CategoriesMenu;
