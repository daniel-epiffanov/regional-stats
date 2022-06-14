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
	
	it('valueChangeHandler callback is called on item click and povides clicked item value', () => {

		render(<List items={ITEMS} valueChangeHandler={valueChangeHandler}/>)

		const firstDivElement = screen.getByText(firstItem)
		const secondDivElement = screen.getByText(secondItem)

		fireEvent.click(firstDivElement)
		expect(valueChangeHandler).toBeCalledWith(firstItem)
		
		fireEvent.click(secondDivElement)
		expect(valueChangeHandler).toBeCalledWith(secondItem)

		// screen.debug()
	})

})
