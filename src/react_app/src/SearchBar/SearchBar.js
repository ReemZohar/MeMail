import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdClose, MdTune } from 'react-icons/md';
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch';
import './SearchBar.css';

function SearchBar({ token, onSearchResults }) {
  const [query, setQuery] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [includes, setIncludes] = useState('');
  const [excludes, setExcludes] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const navigate = useNavigate();

  const performSearch = async (q) => {
    if (!q.trim()) {
      onSearchResults(null);
      return;
    }
    try {
      const response = await fetch(`http://localhost:9090/api/mails/search/${encodeURIComponent(q)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      onSearchResults(data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        navigate(`/mail?search=${encodeURIComponent(query)}`);
        performSearch(query);
      } else {
        navigate('/mail');
        onSearchResults(null);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query, navigate]);

  const clearInput = () => {
    setQuery('');
  };

  return (
    <div style={{ position: 'relative', width: '600px' }}>
      <div className="search-bar">
        <button
          type="button"
          className="search-icon-button"
          onClick={() => performSearch(query)}
          aria-label="Search"
        >
          <MdSearch className="search-icon" />
        </button>
        <input
          type="text"
          placeholder="Search mail"
          aria-label="Search mail"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onClick={() => setShowAdvanced(false)}
        />
        {query && (
          <button className="clear-button" onClick={clearInput} aria-label="Clear search">
            <MdClose size={20} />
          </button>
        )}
        <button
          className="advanced-button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-label="Advanced search"
        >
          <MdTune size={20} />
        </button>
      </div>

      {showAdvanced && (
        <div className="search-card-container">
          <AdvancedSearch
            theme="light"
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
        </div>
      )}
    </div>
  );
}

export default SearchBar;