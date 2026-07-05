import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieMarquee from '../components/MovieMarquee.jsx'
import Navbar from '../components/Navbar.jsx'

const API_KEY = 'bedba5ab'
const DEFAULT_SEARCH = 'movie'

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    const searchValue = searchTerm.trim() || DEFAULT_SEARCH
    setIsLoading(true)
    setMessage('')

    try {
      await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(searchValue)}&type=movie&page=1&apikey=${API_KEY}`,
      )
      navigate(
        searchTerm.trim()
          ? `/find-your-movie?search=${encodeURIComponent(searchValue)}`
          : '/find-your-movie',
      )
    } catch {
      setMessage('Something went wrong while searching. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="home-page">
      <header className="home-banner">
        <div className="content-wrapper justify-between align-center home-nav">
          <Navbar />
        </div>
        <MovieMarquee />
      </header>

      <section className="home-hero content-wrapper">
        <div className="home-copy">
          <h1>Find Your Next Favorite Movie</h1>
          <h2>
            Browse the OMDb catalog with <span>Movie Browser</span>
          </h2>

          <form className="home-search" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search by movie title or keyword"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="submit" disabled={isLoading} aria-label="Search movies">
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
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
              )}
            </button>
          </form>

          <p className="home-message" aria-live="polite">
            {message}
          </p>
        </div>

        <div className="movie-brand-visual" aria-hidden="true">
          <div className="hero-poster hero-poster-left">
            <span>Action</span>
          </div>
          <div className="hero-poster hero-poster-center">
            <div className="play-badge"></div>
            <span>Drama</span>
          </div>
          <div className="hero-poster hero-poster-right">
            <span>Sci-Fi</span>
          </div>
          <div className="browser-label">Movie Browser</div>
        </div>
      </section>
    </main>
  )
}

export default Home
