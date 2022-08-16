import React from 'react'
import './MovieList.css'

const MovieList = ({ data, searching }) => {
  if (searching) return <h3>Searching...</h3>
  if (!data) return null
  if (data.page && !data.total_results) return <h2>No movies found</h2>
  console.log({ data })
  return (
    <>
      {data.results.map((item) => (
        <MovieItem key={item.id} {...item} />
      ))}
    </>
  )
}

export default MovieList

const MovieItem = ({ poster_path, title }) => {
  const src = poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : ''
  return (
    <div className='ctn-movie-item'>
      <div className='ctn-poster'>
        <img src={src} alt={`A poster of the movie '${title}'`} />
      </div>
    </div>
  )
}
