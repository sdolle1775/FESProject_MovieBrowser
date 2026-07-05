import MovieCard from './MovieCard.jsx'

function MovieGrid({ movies, message }) {
  return (
    <div id="cars">
      <div className="content-wrapper">
        <div className="message-area" aria-live="polite">
          {message}
        </div>

        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieGrid
