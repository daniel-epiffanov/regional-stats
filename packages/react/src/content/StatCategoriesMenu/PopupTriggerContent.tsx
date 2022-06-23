import { FC } from 'react';
import { useCurValuesContext } from '../../context/CurValuesContext';

const PopupTriggerContent: FC = () => {
  const { curStatCategoriesChain } = useCurValuesContext();

  if (curStatCategoriesChain.length === 0) return (
    <p data-testid="no-data-text">statistics categories</p>
  );

  return (
    <>
      {
        curStatCategoriesChain.map((curStatCategory, i) => {
          const isLastElement = curStatCategoriesChain.length === (i + 1);
          return (
            <>
              <p data-testid="cur-stat-category-text">{curStatCategory}</p>
              {!isLastElement && <i data-testid="dx-icon-chevronright" className="dx-icon-chevronright" />}
            </>
          );
        })
      }
    </>
  );
};

export default PopupTriggerContent;
