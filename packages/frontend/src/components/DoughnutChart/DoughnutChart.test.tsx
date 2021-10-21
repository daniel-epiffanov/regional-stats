import React from 'react'
import ReactDOM from 'react-dom'
import PieChart from './DoughnutChart'

it('It should mount', () => {
	const div = document.createElement('div')
	ReactDOM.render(<PieChart />, div)
	ReactDOM.unmountComponentAtNode(div)
})
