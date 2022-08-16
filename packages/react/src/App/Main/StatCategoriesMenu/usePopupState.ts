import { useToggle } from 'react-use';

const usePopupState = () => {
  const [isPopupVisible, toggleIsPopupVisible] = useToggle(false);

  const showPopup = () => toggleIsPopupVisible(true);
  const hidePopup = () => toggleIsPopupVisible(false);

  return {
    isPopupVisible,
    showPopup,
    hidePopup
  };
};

export default usePopupState;