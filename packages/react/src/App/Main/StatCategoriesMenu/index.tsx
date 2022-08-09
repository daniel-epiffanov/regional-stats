import { FC } from 'react';
import { useToggle } from 'react-use';
import styles from './styles/index.module.scss';
import PopupContent from './PopupContent';
import Popup from '../../../dxComponents/Popup';
import MenuOutput from './MenuOutput';

const StatCategoriesMenu: FC = () => {
  const [isPopupVisible, toggleIsPopupVisible] = useToggle(false);

  const showPopup = () => toggleIsPopupVisible(true);
  const hidePopup = () => toggleIsPopupVisible(false);

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
