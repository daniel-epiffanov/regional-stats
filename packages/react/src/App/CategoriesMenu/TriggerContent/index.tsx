import { FC } from 'react';
import { useWindowSize } from 'react-use';
import _ from 'lodash';
import { useCategoriesMenuContext } from '../../../context/CategoriesMenuContext';
import getTitle from '../getTitle';

const getTruncatedText = (text: string, windowWidth: number) => {
  const CHAR_WIDTH = 10;
  const ICONS_WIDTH = 100;
  const NUMBER_OF_CATEGORIES = 3;
  const maxLength = (windowWidth - ICONS_WIDTH) / NUMBER_OF_CATEGORIES /CHAR_WIDTH ;
  return _.truncate(text, {length: maxLength});
};

const TriggerContent: FC = () => {
  const { curCategoryNames } = useCategoriesMenuContext();
  const {curMainCategoryName, curSubCategoryName, curSubSubCategoryName} = curCategoryNames;
  const { width: windowWidth } = useWindowSize();

  if (!curMainCategoryName) return (
    <p data-testid="no-data-text">Категория не выбрана</p>
  );

  return (
    <p data-testid="text">
      {getTitle(
        getTruncatedText(curMainCategoryName, windowWidth),
        curSubCategoryName && getTruncatedText(curSubCategoryName, windowWidth),
        curSubSubCategoryName && getTruncatedText(curSubSubCategoryName, windowWidth)
      )}
    </p>
  );
};

export default TriggerContent;
