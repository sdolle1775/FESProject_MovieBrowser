import { useEffect, useMemo, useState } from 'react'

const API_KEY = 'bedba5ab'

const fallbackPosters = [
  'The Matrix',
  'Inception',
  'Interstellar',
  'The Batman',
  'Spider-Man',
  'Dune',
  'Black Panther',
  'John Wick',
  'Baby Driver',
  'Coraline',
  'Arrival',
  'Avatar',
].map((title, index) => ({
  title,
  poster: createPosterDataUri(title, index),
}))

function createPosterDataUri(title, index) {
  const gradients = [
    ['#6030b1', '#21173d'],
    ['#482a84', '#181131'],
    ['#2b1e52', '#6030b1'],
  ]
  const [start, end] = gradients[index % gradients.length]
  const words = title.split(' ')
  const lineOne = words.slice(0, 2).join(' ')
  const lineTwo = words.slice(2).join(' ')

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="445" viewBox="0 0 300 445">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="${start}" />
          <stop offset="1" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="300" height="445" fill="url(#g)" />
      <circle cx="230" cy="82" r="58" fill="rgba(255,255,255,0.16)" />
      <rect x="34" y="234" width="232" height="126" rx="8" fill="rgba(0,0,0,0.32)" />
      <text x="34" y="92" fill="#fff" font-family="Arial, sans-serif" font-size="32" font-weight="800">${lineOne}</text>
      <text x="34" y="130" fill="#fff" font-family="Arial, sans-serif" font-size="32" font-weight="800">${lineTwo}</text>
      <text x="34" y="390" fill="#fff" opacity="0.76" font-family="Arial, sans-serif" font-size="18" font-weight="700">MOVIE BROWSER</text>
    </svg>
  `

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function MovieMarquee() {
  const [posters, setPosters] = useState(fallbackPosters)

  useEffect(() => {
    let ignore = false

    async function loadPosters() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent('movie')}&type=movie&page=1&apikey=${API_KEY}`,
        )
        const data = await response.json()

        if (ignore || data.Response === 'False' || !data.Search) {
          return
        }

        const apiPosters = data.Search.filter(
          (movie) => movie.Poster && movie.Poster !== 'N/A',
        ).map((movie, index) => ({
          title: movie.Title,
          poster: movie.Poster,
          fallback: createPosterDataUri(movie.Title, index),
        }))

        if (apiPosters.length > 0) {
          setPosters(apiPosters)
        }
      } catch {
        setPosters(fallbackPosters)
      }
    }

    loadPosters()

    return () => {
      ignore = true
    }
  }, [])

  const marqueePosters = useMemo(
    () => [...posters, ...posters, ...posters],
    [posters],
  )

  return (
    <div className="movie-marquee" aria-hidden="true">
      <div className="movie-marquee-track">
        {marqueePosters.map((movie, index) => (
          <div className="marquee-card" key={`${movie.title}-${index}`}>
            <img
              src={movie.poster}
              alt=""
              onError={(event) => {
                event.currentTarget.src =
                  movie.fallback || createPosterDataUri(movie.title, index)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieMarquee
