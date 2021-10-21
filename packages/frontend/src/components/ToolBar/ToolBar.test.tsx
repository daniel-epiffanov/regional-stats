import React from 'react';
import ReactDOM from 'react-dom';
import ToolBar from './ToolBar';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ToolBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});