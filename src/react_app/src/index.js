import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchBar from './SearchBar/SearchBar'
import AdvancedSearch from './AdvancedSearch/AdvancedSearch';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchBar />
  </React.StrictMode>
);