import React from 'react'
import './MovieItem.css'

const MovieItem = ({ poster_path, title }) => {
  const src = poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : ''
  const alt = `A poster of the movie '${title}'`
  return (
    <div className='movie-item'>
      <div className='poster'>
        {src ? (
          <img src={src} alt={alt} />
        ) : (
          <span>{`Poster coming soon '${title}'`}</span>
        )}
      </div>
    </div>
  )
}

export default MovieItem
