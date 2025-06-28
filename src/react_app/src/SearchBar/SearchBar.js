import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const performSearch = React.useCallback(async (q) => {
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
  }, [token, onSearchResults]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      const path = window.location.pathname;
      const isViewingMail = /^\/mail\/\d+$/.test(path);
      if (!isViewingMail) {
        if (query.trim()) {
          navigate(`/mail?search=${encodeURIComponent(query)}`);
          performSearch(query);
        } else {
          navigate('/mail');
          onSearchResults(null);
        }
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [query, navigate, performSearch, onSearchResults]);

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
          <i className="bi bi-search search-icon"></i>
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
            <i className="bi bi-x" style={{ fontSize: 20 }}></i>
          </button>
        )}
        <button
          className="advanced-button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-label="Advanced search"
        >
          <i className="bi bi-funnel" style={{ fontSize: 20 }}></i>
        </button>
      </div>

      {showAdvanced && (
        <div className="search-card-container">
          <AdvancedSearch
            token={token}
            onSearchResults={onSearchResults}
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
            setShowAdvanced={setShowAdvanced}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;