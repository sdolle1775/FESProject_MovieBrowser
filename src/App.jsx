import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout.jsx'
import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import MovieSearch from './pages/MovieSearch.jsx'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<MovieSearch />} />
        <Route path="home" element={<Home />} />
        <Route path="find-your-movie" element={<MovieSearch />} />
        <Route path="movie/:imdbID" element={<MovieDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
