function FilterBar({
  displayedCount,
  currentPage,
  resultsPerPage,
  searchTerm,
  totalMatches,
  totalResults,
  sortValue,
  onSortChange,
}) {
  const firstResult =
    totalResults > 0 ? (currentPage - 1) * resultsPerPage + 1 : 0
  const lastResult = totalResults > 0 ? firstResult + displayedCount - 1 : 0

  return (
    <div id="filter" className="content-wrapper justify-between align-center">
      <div className="results-heading">
        <h1 className="search-info">
          {searchTerm === 'All Movies' ? (
            <span>{searchTerm}</span>
          ) : (
            <>
              <span className="black-txt">Search results for</span>
              <span>"{searchTerm}"</span>
            </>
          )}
        </h1>
        <p>
          Showing {firstResult}-{lastResult} of {totalResults} loaded movies
          {totalMatches > totalResults && ` (${totalMatches} total matches)`}
        </p>
      </div>

      <div className="sort-filter">
        <label htmlFor="sort-select">
          <span className="black-txt">Sort by:</span>
        </label>
        <select
          id="sort-select"
          value={sortValue}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="az">Alphabetical A to Z</option>
          <option value="za">Alphabetical Z to A</option>
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
      </div>
    </div>
  )
}

export default FilterBar
