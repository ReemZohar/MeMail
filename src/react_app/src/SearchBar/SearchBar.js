import React, { useState, useRef } from 'react';
import { MdSearch, MdClose, MdTune } from 'react-icons/md';
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  //advanced search filters
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [includes, setIncludes] = useState('');
  const [excludes, setExcludes] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const inputRef = useRef(null);

  const clearInput = () => {
    setQuery('');
    inputRef.current.focus();
  };

  const performSearch = async () => {
  
  }

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
          onClick={() => setShowAdvanced(false)}
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
            fromVal={from}
            onChgFrom={e => setFrom(e.target.value)}
            toVal={to}
            onChgTo={e => setTo(e.target.value)}
            subVal={subject}
            onChgSub={e => setSubject(e.target.value)}
            incVal={includes}
            onChgInc={e => setIncludes(e.target.value)}
            notIncVal={excludes}
            onChgNotInc={e => setExcludes(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}

export default SearchBar;
