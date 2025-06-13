import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="container mt-3">
      <div id="searchWrapper" className="search-bar">
        <input
          type="text"
          id="searchInput"
          className="form-control"
          placeholder="Search mail"
        />
      </div>
    </div>
  );
}

export default SearchBar;
