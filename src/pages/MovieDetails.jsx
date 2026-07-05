import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const API_KEY = 'bedba5ab'
const POSTER_FALLBACK = 'https://via.placeholder.com/300x445?text=No+Poster'

function DetailItem({ label, value }) {
  if (!value || value === 'N/A') {
    return null
  }

  return (
    <div className="detail-item">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function MovieDetails() {
  const { imdbID } = useParams()
  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchMovieDetails() {
      setIsLoading(true)
      setMessage('')

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&plot=full&apikey=${API_KEY}`,
          { signal: controller.signal },
        )
        const data = await response.json()

        if (data.Response === 'False') {
          setMovie(null)
          setMessage(data.Error || 'Movie details were not found.')
          return
        }

        setMovie(data)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setMovie(null)
          setMessage('Something went wrong while loading movie details.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchMovieDetails()

    return () => {
      controller.abort()
    }
  }, [imdbID])

  return (
    <main className="details-page">
      <header className="details-banner">
        <div className="content-wrapper justify-between align-center details-nav">
          <Navbar />
        </div>
      </header>

      <section className="details-section">
        <div className="content-wrapper">
          <Link className="back-link" to="/find-your-movie">
            Back to movies
          </Link>

          {isLoading && (
            <div className="details-loading">
              <span className="loading-spinner"></span>
            </div>
          )}

          {!isLoading && message && (
            <div className="details-message">{message}</div>
          )}

          {!isLoading && movie && (
            <div className="details-layout">
              <div className="details-poster-wrap">
                <img
                  className="details-poster"
                  src={
                    movie.Poster && movie.Poster !== 'N/A'
                      ? movie.Poster
                      : POSTER_FALLBACK
                  }
                  alt={`${movie.Title} poster`}
                />
              </div>

              <article className="details-content">
                <p className="details-year">{movie.Year}</p>
                <h1>{movie.Title}</h1>
                <div className="details-meta">
                  <span>{movie.Rated}</span>
                  <span>{movie.Runtime}</span>
                  <span>{movie.Genre}</span>
                </div>

                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                  <div className="rating-pill">
                    IMDb Rating <strong>{movie.imdbRating}</strong>
                  </div>
                )}

                <section className="plot-section">
                  <h2>Plot</h2>
                  <p>{movie.Plot}</p>
                </section>

                <dl className="details-list">
                  <DetailItem label="Director" value={movie.Director} />
                  <DetailItem label="Writer" value={movie.Writer} />
                  <DetailItem label="Actors" value={movie.Actors} />
                  <DetailItem label="Released" value={movie.Released} />
                  <DetailItem label="Language" value={movie.Language} />
                  <DetailItem label="Awards" value={movie.Awards} />
                  <DetailItem label="Box Office" value={movie.BoxOffice} />
                </dl>
              </article>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default MovieDetails
