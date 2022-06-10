import { render, screen } from '@testing-library/react';
import List from '../List';

test('on initial render list is null',() => {
	render(<List />)
	// render(<List items={['a', 'b', 'c']} />)

	screen.debug()
})