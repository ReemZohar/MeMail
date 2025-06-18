import React, { useState, useRef } from 'react';
import { MdSearch, MdClose, MdTune } from 'react-icons/md';
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const inputRef = useRef(null);

  const clearInput = () => {
    setQuery('');
    inputRef.current.focus();
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
    <div>
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
        <button className="advanced-button" onClick={() => setShowAdvanced(!showAdvanced)} aria-label="Advanced search">
          <MdTune size={20} />
        </button>
      </div>
      <div>
        {showAdvanced && (
          <AdvancedSearch
            theme={"light"}
          />
        )}
      </div>
    </div>
  );
}

export default SearchBar;
