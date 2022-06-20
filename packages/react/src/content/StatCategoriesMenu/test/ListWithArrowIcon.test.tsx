import { fireEvent, render, screen } from '@testing-library/react';
import List from '../List';

const ITEMS = ['first list item', 'second list item']
const firstItem = ITEMS[0]
const secondItem = ITEMS[1]
const valueChangeHandler = jest.fn()

describe('List', () => {
	
	it('renders all passed items corectly', () => {
		render(<List items={ITEMS} />)

		const firstDivElement = screen.getByText(firstItem)
		const secondDivElement = screen.getByText(firstItem)
		expect(firstDivElement).toBeInTheDocument()
		expect(secondDivElement).toBeInTheDocument()
	
		// screen.debug()
	})

})
