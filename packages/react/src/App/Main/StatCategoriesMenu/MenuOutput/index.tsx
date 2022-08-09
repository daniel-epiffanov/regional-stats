import { FC } from 'react';
import { useCurValuesContext } from '../../../../context/CurValuesContext';
import _ from 'lodash';
import styles from './MenuOutput.module.scss';

const MenuOutput: FC = () => {
  const { curStatCategoriesChain } = useCurValuesContext();

  if (curStatCategoriesChain.length === 0) return (
    <p data-testid="no-data-text">statistics categories</p>
  );

  return (
    <p className={styles['root']}>
      {
        curStatCategoriesChain.map((curStatCategory, i) => {
          const isLastElement = curStatCategoriesChain.length === (i + 1);
          return (
            <>
              <span data-testid="cur-stat-category-text">
                {/* {_.truncate(curStatCategory, {length: isLastElement ? 50 : 15})} */}
                {curStatCategory}
              </span>
              {!isLastElement && <i data-testid="dx-icon-chevronright" className="dx-icon-chevronright" />}
            </>
          );
        })
      }
    </p>
  );
};

export default MenuOutput;
