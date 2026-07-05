import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterBar from '../components/FilterBar.jsx'
import LoadingBar from '../components/LoadingBar.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import Pagination from '../components/Pagination.jsx'
import SearchHero from '../components/SearchHero.jsx'

const API_KEY = 'bedba5ab'
const DEFAULT_SEARCH = 'movie'
const DEFAULT_SEARCH_LABEL = 'All Movies'
const RESULTS_PER_PAGE = 10
const MAX_RESULT_PAGES = 5
const POSTER_FALLBACK = 'https://via.placeholder.com/300x445?text=No+Poster'

function getPageFromParams(searchParams) {
  const page = Number.parseInt(searchParams.get('page') || '1', 10)

  return Number.isNaN(page) || page < 1 ? 1 : page
}

function sortMovies(movies, sortValue) {
  const sortedMovies = [...movies]

  if (sortValue === 'az') {
    sortedMovies.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortValue === 'za') {
    sortedMovies.sort((a, b) => b.title.localeCompare(a.title))
  } else if (sortValue === 'newest') {
    sortedMovies.sort((a, b) => b.year - a.year)
  } else if (sortValue === 'oldest') {
    sortedMovies.sort((a, b) => a.year - b.year)
  }

  return sortedMovies
}

function formatMovies(apiMovies) {
  return apiMovies.map((movie) => ({
    title: movie.Title,
    year: Number.parseInt(movie.Year, 10) || 0,
    poster:
      movie.Poster && movie.Poster !== 'N/A'
        ? movie.Poster
        : POSTER_FALLBACK,
    imdbID: movie.imdbID,
  }))
}

function getUniqueMovies(movies) {
  const seenIds = new Set()

  return movies.filter((movie) => {
    if (seenIds.has(movie.imdbID)) {
      return false
    }

    seenIds.add(movie.imdbID)
    return true
  })
}

function MovieSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const querySearchTerm = searchParams.get('search') || ''
  const queryPage = getPageFromParams(searchParams)
  const [searchTerm, setSearchTerm] = useState(querySearchTerm)
  const [currentPage, setCurrentPage] = useState(queryPage)
  const [movies, setMovies] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [totalMatches, setTotalMatches] = useState(0)
  const [sortValue, setSortValue] = useState('az')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setSearchTerm(querySearchTerm)
    setCurrentPage(queryPage)
  }, [querySearchTerm, queryPage])

  useEffect(() => {
    const nextParams = {}

    if (searchTerm.trim()) {
      nextParams.search = searchTerm.trim()
    }

    if (currentPage > 1) {
      nextParams.page = String(currentPage)
    }

    setSearchParams(nextParams, { replace: true })
  }, [currentPage, searchTerm, setSearchParams])

  useEffect(() => {
    const controller = new AbortController()
    const searchValue = searchTerm.trim() || DEFAULT_SEARCH

    const searchTimeout = setTimeout(async () => {
      setIsLoading(true)
      setMessage('')

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(searchValue)}&type=movie&page=1&apikey=${API_KEY}`,
          { signal: controller.signal },
        )
        const data = await response.json()

        if (data.Response === 'False' || !data.Search) {
          setMovies([])
          setTotalResults(0)
          setTotalMatches(0)
          setMessage('No movies found.')
          return
        }

        const apiTotalResults = Number.parseInt(data.totalResults || '0', 10)
        const apiTotalPages = Math.ceil(apiTotalResults / RESULTS_PER_PAGE)
        const pagesToLoad = Math.min(MAX_RESULT_PAGES, apiTotalPages)
        const remainingPages = Array.from(
          { length: Math.max(0, pagesToLoad - 1) },
          (_, index) => index + 2,
        )

        const pageResults = await Promise.all(
          remainingPages.map(async (page) => {
            const pageResponse = await fetch(
              `https://www.omdbapi.com/?s=${encodeURIComponent(searchValue)}&type=movie&page=${page}&apikey=${API_KEY}`,
              { signal: controller.signal },
            )
            const pageData = await pageResponse.json()

            return pageData.Search || []
          }),
        )
        const loadedMovies = getUniqueMovies(
          formatMovies([data.Search, ...pageResults].flat()),
        )

        setTotalMatches(apiTotalResults)
        setTotalResults(loadedMovies.length)
        setMovies(loadedMovies)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setMovies([])
          setTotalResults(0)
          setTotalMatches(0)
          setMessage('Something went wrong while loading movies.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }, 400)

    return () => {
      clearTimeout(searchTimeout)
      controller.abort()
    }
  }, [searchTerm])

  const sortedMovies = useMemo(
    () => sortMovies(movies, sortValue),
    [movies, sortValue],
  )
  const totalPages = Math.ceil(sortedMovies.length / RESULTS_PER_PAGE)
  const paginatedMovies = sortedMovies.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE,
  )
  const displaySearchTerm = searchTerm.trim() || DEFAULT_SEARCH_LABEL

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  function handleSearchChange(value) {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  function handlePageChange(page) {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSortChange(value) {
    setSortValue(value)
    setCurrentPage(1)
  }

  return (
    <>
      <SearchHero searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <section id="search">
        <LoadingBar isLoading={isLoading} />
        <FilterBar
          displayedCount={paginatedMovies.length}
          currentPage={currentPage}
          resultsPerPage={RESULTS_PER_PAGE}
          searchTerm={displaySearchTerm}
          totalMatches={totalMatches}
          totalResults={totalResults}
          sortValue={sortValue}
          onSortChange={handleSortChange}
        />
        <MovieGrid movies={paginatedMovies} message={message} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  )
}

export default MovieSearch
