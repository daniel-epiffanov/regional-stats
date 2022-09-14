import { FC } from 'react';
import { useWindowSize } from 'react-use';
import { useMenuContext } from '../../../../context/MenuContext';
import styles from './MenuOutput.module.scss';
import _ from 'lodash';

const truncatedText = (text: string, windowWidth: number) => {
  const CHAR_WIDTH = 10;
  const ICONS_WIDTH = 100;
  const NUMBER_OF_CATEGORIES = 3;
  const maxLength = (windowWidth - ICONS_WIDTH) / NUMBER_OF_CATEGORIES /CHAR_WIDTH ;
  return _.truncate(text, {length: maxLength});
};

const MenuOutput: FC = () => {
  const { curStatCategories } = useMenuContext();
  const { width: windowWidth } = useWindowSize();

  if (!curStatCategories.firstCategory) return (
    <p data-testid="no-data-text">Категория не выбрана</p>
  );

  return (
    <p className={styles['root']}>
      <span data-testid="first-category">{truncatedText(curStatCategories.firstCategory, windowWidth)} </span>
      {curStatCategories.secondCategory && (
        <>
          <i className="dx-icon-chevronright" />
          <span data-testid="second-category">{truncatedText(curStatCategories.secondCategory, windowWidth)}</span>
        </>
      )}
      {curStatCategories.thirdCategory && (
        <>
          <i className="dx-icon-chevronright" />
          <span data-testid="third-category">{truncatedText(curStatCategories.thirdCategory, windowWidth)}</span>
        </>
      )}
    </p>
  );
};

export default MenuOutput;
