import { Autocomplete } from 'devextreme-react';
import React from 'react';
import styles from '../styles/Search.module.scss';

const autocompleteData = [
  'Afghanistan',
  'Albania',
  // ...
];

const Search = () => (
  <Autocomplete
    dataSource={autocompleteData}
    placeholder="Начните вводить..."
  />
);

export default Search;
