import { render, screen } from '@testing-library/react';
import TriggerContent from '.';
import { CategoriesMenuProvider } from '../../../context/CategoriesMenuContext';
import CustomApolloProvider from '../../../context/CustomApolloProvider';

  
describe('TriggerContent', () => {
  it('"Категория не выбрана" is displayed if curMainCategoryName object is empty', () => {
    render(
      <CustomApolloProvider>
        <CategoriesMenuProvider>
          <TriggerContent />
        </CategoriesMenuProvider>,
      </CustomApolloProvider>
    );

    const pElement = screen.getByTestId('no-data-text');
    expect(pElement).toBeInTheDocument();
    expect(pElement.innerHTML).toContain('Категория не выбрана');
  });

  it('all passed categories are present', async () => {
    render(
      <CustomApolloProvider>
        <CategoriesMenuProvider
          curCategoryNames={{
            curMainCategoryName: 'first-category-name-mock',
            curSubCategoryName: 'second-category-name-mock',
            curSubSubCategoryName: 'third-category-name-mock',
          }}
        >
          <TriggerContent />
        </CategoriesMenuProvider>,
      </CustomApolloProvider>
    );

    const categoryNamesPElement = await screen.getByTestId('text');
    
    expect(categoryNamesPElement).toBeInTheDocument();

    expect(categoryNamesPElement.innerHTML).toContain('first-category-name-mock');
    expect(categoryNamesPElement.innerHTML).toContain('second-category-name-mock');
    expect(categoryNamesPElement.innerHTML).toContain('third-category-name-mock');

  });
});
  