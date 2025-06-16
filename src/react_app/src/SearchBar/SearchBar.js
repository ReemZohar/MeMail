import React, { useState, useRef } from 'react';
import { MdSearch, MdClose, MdTune } from 'react-icons/md';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const clearInput = () => {
    setQuery('');
    inputRef.current.focus();
  };

  const openAdvancedSearch = () => {
    //Advanced search logic
    alert('Open advanced search modal'); //todo delete
  };

  const performSearch = () => {
    alert(`Search for: ${query}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className="search-bar">
      <button
        type="button"
        className="search-icon-button"
        onClick={performSearch}
        aria-label="Search"
      >
        <MdSearch className="search-icon" />
      </button>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search mail"
        aria-label="Search mail"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {query && (
        <button className="clear-button" onClick={clearInput} aria-label="Clear search">
          <MdClose size={20} />
        </button>
      )}
      <button className="advanced-button" onClick={openAdvancedSearch} aria-label="Advanced search">
        <MdTune size={20} />
      </button>
    </div>
  );
}

export default SearchBar;
