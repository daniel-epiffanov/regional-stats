import React from 'react';
import ReactDOM from 'react-dom';
import ChartWrapper from './ChartWrapper';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChartWrapper />, div);
  ReactDOM.unmountComponentAtNode(div);
});