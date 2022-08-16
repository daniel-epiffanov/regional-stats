import { render, screen } from '@testing-library/react';
import MenuOutput from '.';
import { MenuProvider } from '../../../../context/MenuContext';

  
describe('MenuOutput', () => {
  it('"Category is not chosen" is displayed if curStatCategories object is empty', () => {
    render(
      <MenuProvider>
        <MenuOutput />
      </MenuProvider>,
    );

    const pElement = screen.getByTestId('no-data-text');
    expect(pElement).toBeInTheDocument();
    expect(pElement.innerHTML).toContain('Category is not chosen');
  });

  it('all passed categories are displayed', () => {
    render(
      <MenuProvider
        curStatCategories={{
          firstCategory: 'first-category-title-mock',
          secondCategory: 'second-category-title-mock',
          thirdCategory: 'third-category-title-mock',
        }}
      >
        <MenuOutput />
      </MenuProvider>,
    );

    const firstCategorySpanElement = screen.getByTestId('first-category');
    const secondCategorySpanElement = screen.getByTestId('second-category');
    const thirdCategorySpanElement = screen.getByTestId('third-category');

    expect(firstCategorySpanElement.innerHTML).toContain('first-category-title-mock');
    expect(secondCategorySpanElement.innerHTML).toContain('second-category-title-mock');
    expect(thirdCategorySpanElement.innerHTML).toContain('third-category-title-mock');
  });
});
  