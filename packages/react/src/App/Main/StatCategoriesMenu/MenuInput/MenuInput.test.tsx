import { fireEvent, render, screen } from '@testing-library/react';
import MenuInput from '.';
import { MenuProvider } from '../../../../context/MenuContext';

  
describe('MenuInput', () => {
  it('first render no data', () => {
    render(
      <MenuProvider>
        <MenuInput />
      </MenuProvider>
    );

    const noDataMessagePElement = screen.getByTestId('no-data-text');
    expect(noDataMessagePElement).toBeInTheDocument();
    expect(noDataMessagePElement.innerHTML).toContain('please, wait');
  });

  it('fetching categories', async () => {
    render(
      <MenuProvider>
        <MenuInput />
      </MenuProvider>
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
  