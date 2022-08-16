import { fireEvent, render, screen } from '@testing-library/react';
import DxCustomList from '.';

const ITEMS = ['first list item', 'second list item'];
const firstItem = ITEMS[0];
const secondItem = ITEMS[1];
const valueChangeHandler = jest.fn();

describe('List', () => {
  it('renders all passed items corectly', async () => {
    render(<DxCustomList items={ITEMS} />);

    const firstDivElement = await screen.findByText(firstItem);
    const secondDivElement = await screen.findByText(firstItem);
    expect(firstDivElement).toBeInTheDocument();
    expect(secondDivElement).toBeInTheDocument();

    // screen.debug()
  });

  it('valueChangeHandler callback', async () => {
    render(<DxCustomList items={ITEMS} valueChangeHandler={valueChangeHandler} />);

    const firstDivElement = await screen.findByText(firstItem);
    const secondDivElement = await screen.findByText(secondItem);

    fireEvent.click(firstDivElement);
    expect(valueChangeHandler).toBeCalledWith(firstItem);

    fireEvent.click(secondDivElement);
    expect(valueChangeHandler).toBeCalledWith(secondItem);

    // screen.debug()
  });
});
