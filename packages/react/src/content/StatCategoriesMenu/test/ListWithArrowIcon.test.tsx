import { render, screen } from '@testing-library/react';
import ListWithArrowIcon from '../ListWithArrowIcon';

const ITEMS = ['first list item', 'second list item'];

describe('ListWithArrowIcon', () => {
  it('renders dx-icon-chevronright before List', () => {
    render(<ListWithArrowIcon items={ITEMS} />);

    const iconElement = screen.getByTestId('dx-icon-chevronright');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toBeVisible();
  });
});
