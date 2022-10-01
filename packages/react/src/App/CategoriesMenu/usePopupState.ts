import { useToggle } from 'react-use';
import { useCategoriesMenuContext } from '../../context/CategoriesMenuContext';

const usePopupState = () => {
  const {curCategoryNames} = useCategoriesMenuContext();

  const isCategoryNamesPresent = !!curCategoryNames.curMainCategoryName &&
    !!curCategoryNames.curSubCategoryName;

  const [isPopupVisible, toggleIsPopupVisible] = useToggle(
    !isCategoryNamesPresent
  );

  const showPopup = () => toggleIsPopupVisible(true);
  const hidePopup = () => toggleIsPopupVisible(false);

  return {
    isPopupVisible,
    showPopup,
    hidePopup
  };
};

export default usePopupState;