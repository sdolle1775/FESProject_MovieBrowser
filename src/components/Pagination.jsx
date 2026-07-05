function getVisiblePages(currentPage, totalPages) {
  const pages = new Set([1, totalPages])

  for (let page = currentPage - 2; page <= currentPage + 2; page += 1) {
    if (page >= 1 && page <= totalPages) {
      pages.add(page)
    }
  }

  return [...pages].sort((a, b) => a - b)
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null
  }

  const pages = getVisiblePages(currentPage, totalPages)

  return (
    <nav className="pagination" aria-label="Movie results pages">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <div className="pagination-pages">
        {pages.map((page, index) => {
          const previousPage = pages[index - 1]
          const hasGap = previousPage && page - previousPage > 1

          return (
            <span className="pagination-page-wrap" key={page}>
              {hasGap && <span className="pagination-gap">...</span>}
              <button
                type="button"
                className={page === currentPage ? 'active' : ''}
                aria-current={page === currentPage ? 'page' : undefined}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </span>
          )
        })}
      </div>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  )
}

export default Pagination
