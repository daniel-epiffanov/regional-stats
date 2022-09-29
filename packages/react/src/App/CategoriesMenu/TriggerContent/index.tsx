import { FC } from 'react';
import _ from 'lodash';
import { useCategoriesMenuContext } from '../../../context/CategoriesMenuContext';
import getTitle from '../getTitle';
import { Button } from 'devextreme-react';
import styles from './TriggerContent.module.scss';

const TriggerContent: FC = () => {
  const { curCategoryNames } = useCategoriesMenuContext();
  const {curMainCategoryName, curSubCategoryName, curSubSubCategoryName} = curCategoryNames;

  if (!curMainCategoryName) return (
    <p data-testid="no-data-text">Категория не выбрана</p>
  );

  return (
    <div className={styles['root']}>
      <Button icon="menu" />
      <p data-testid="text">
        {getTitle(
          curMainCategoryName,
          curSubCategoryName,
          curSubSubCategoryName
        )}
      </p>
    </div>
  );
};

export default TriggerContent;
