import { FC } from 'react';
import { useCurMenuValuesContext } from '../../../../context/CurMenuValuesContext';
import styles from './MenuOutput.module.scss';

const MenuOutput: FC = () => {
  const { curStatCategories: curStatCategoriesMenu } = useCurMenuValuesContext();

  if (curStatCategoriesMenu.length === 0) return (
    <p data-testid="no-data-text">statistics categories</p>
  );

  return (
    <p className={styles['root']}>
      {
        curStatCategoriesMenu.map((curStatCategory, i) => {
          const isLastElement = curStatCategoriesMenu.length === (i + 1);
          console.log({curStatCategoriesChain: curStatCategoriesMenu});
          return (
            <>
              <span>
                {curStatCategory}
              </span>
              {!isLastElement && <i className="dx-icon-chevronright" />}
            </>
          );
        })
      }
    </p>
  );
};

export default MenuOutput;
