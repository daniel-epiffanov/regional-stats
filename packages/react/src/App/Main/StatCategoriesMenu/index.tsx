import { FC } from 'react';
import styles from './styles/index.module.scss';
import PopupContent from './PopupContent';
import Popup from '../../../dxComponents/Popup';
import MenuOutput from './MenuOutput';
import usePopupState from './hooks/usePopupState';

const StatCategoriesMenu: FC = () => {
  const {isPopupVisible, showPopup, hidePopup} = usePopupState();

  const contentRenderHandler = () => <PopupContent hidePopup={hidePopup} />;

  return (
    <div className={styles.root}>
      <div id="popup-trigger" className={styles['popup-trigger']} onClick={showPopup}>
        <MenuOutput />
      </div>

      <Popup
        isVisible={isPopupVisible}
        contentRenderHandler={contentRenderHandler}
        hidingHandler={hidePopup}
        triggerId="#popup-trigger"
      />
    </div>
  );
};

export default StatCategoriesMenu;
