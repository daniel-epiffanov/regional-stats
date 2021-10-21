import React from 'react'
import ReactDOM from 'react-dom'
import PieChart from './MultipleAxesChart'

it('It should mount', () => {
	const div = document.createElement('div')
	ReactDOM.render(<PieChart />, div)
	ReactDOM.unmountComponentAtNode(div)
})
