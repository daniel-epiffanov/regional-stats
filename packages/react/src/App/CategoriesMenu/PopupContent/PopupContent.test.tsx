import { fireEvent, render, screen } from '@testing-library/react';
import PopupContent from '.';
import { CategoriesMenuProvider } from '../../../context/CategoriesMenuContext';
import CustomApolloProvider from '../../../context/CustomApolloProvider';

  
describe('PopupContent', () => {
  it('first render no data', () => {
    render(
      <CustomApolloProvider>
        <CategoriesMenuProvider>
          <PopupContent />
        </CategoriesMenuProvider>
      </CustomApolloProvider>
    );

    const noDataMessagePElement = screen.getByTestId('no-data-text');
    expect(noDataMessagePElement).toBeInTheDocument();
    expect(noDataMessagePElement.innerHTML).toContain('Пожалуйста, подождите');
  });

  it('mainCategoryNames are fetched async, subCategoryNames are fetched after curMainCategoryName is chosen', async () => {
    render(
      <CustomApolloProvider>
        <CategoriesMenuProvider>
          <PopupContent />
        </CategoriesMenuProvider>
      </CustomApolloProvider>
    );

    const categoryInFirstListElement = await screen.findByText('Валовой региональный продукт');
    expect(categoryInFirstListElement).toBeInTheDocument();

    fireEvent.click(categoryInFirstListElement);

    const categoryInSecondListElement = await screen.findByText(
      'Фактическое конечное потребление домашних хозяйств на территории субъектов Российской Федерации'
    );
    expect(categoryInSecondListElement).toBeInTheDocument();
  });

});
  