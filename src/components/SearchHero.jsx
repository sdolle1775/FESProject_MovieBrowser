import Navbar from './Navbar.jsx'

function SearchHero({ searchTerm, onSearchChange }) {
  return (
    <header className="navbar flex flex-col">
      <div className="content-wrapper justify-between align-center nav-wrapper">
        <Navbar />
      </div>

      <div className="content-wrapper flex-col align-center search-hero">
        <h1>Browse Movies</h1>
        <div className="input-wrap">
          <input
            type="text"
            placeholder="Search by movie title or keyword"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <div className="search-wrapper flex justify-center align-center">
            <svg
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M505 442.7 405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34ZM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}

export default SearchHero
