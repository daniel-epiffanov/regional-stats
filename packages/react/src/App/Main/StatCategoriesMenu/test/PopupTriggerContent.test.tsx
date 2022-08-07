import { render, screen } from '@testing-library/react';
import { CurValuesProvider } from '../../../../context/CurValuesContext';
import ListWithArrowIcon from '../ListWithArrowIcon';
import PopupTriggerContent from '../PopupTriggerContent';

describe('PopupTriggerContent', () => {
  it('renders text "statistics categories" if curStatCategoriesChain arr is empty', () => {
    render(
      <CurValuesProvider curStatCategoriesChain={[]}>
        <PopupTriggerContent />
      </CurValuesProvider>
    );

    const noDataTextParagraphElement = screen.getByTestId('no-data-text');
    expect(noDataTextParagraphElement).toBeInTheDocument();
    expect(noDataTextParagraphElement).toBeVisible();
  });

  // it('renders first category and doesnt render no-data-text and icon', () => {
  //   render(
  //     <CurValuesProvider curStatCategoriesChain={['first category']}>
  //       <PopupTriggerContent />
  //     </CurValuesProvider>
  //   );

  //   const noDataTextParagraphElement = screen.queryByTestId('no-data-text');
  //   expect(noDataTextParagraphElement).toBeNull();
		
  //   const iconElement = screen.queryByTestId('dx-icon-chevronright');
  //   expect(iconElement).toBeNull();
		
  //   const firstCategoryParagraphElement = screen.getByText('first category');
  //   expect(firstCategoryParagraphElement).toBeInTheDocument();

  // });

  // it('renders first category, second category and icon', () => {
  //   render(
  //     <CurValuesProvider curStatCategoriesChain={['first category', 'second category']}>
  //       <PopupTriggerContent />
  //     </CurValuesProvider>
  //   );
  //   const iconElement = screen.getByTestId('dx-icon-chevronright');
  //   expect(iconElement).toBeInTheDocument();
		
  //   const firstCategoryParagraphElement = screen.getByText('first category');
  //   const secondCategoryParagraphElement = screen.getByText('second category');
  //   expect(firstCategoryParagraphElement).toBeInTheDocument();
  //   expect(secondCategoryParagraphElement).toBeInTheDocument();

  // });
});
