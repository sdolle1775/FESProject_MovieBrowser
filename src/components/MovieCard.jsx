import { Link } from 'react-router-dom'

function MovieCard({ movie }) {
  return (
    <Link className="movie-card" to={`/movie/${movie.imdbID}`}>
      <img className="movie-poster" src={movie.poster} alt={`${movie.title} poster`} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.year || 'Unknown year'}</p>
      </div>
    </Link>
  )
}

export default MovieCard
