import React from 'react'
import MovieItem from './MovieItem'

const MovieList = ({ data, searching }) => {
  if (searching) return <h3>Searching...</h3>
  if (!data) return null
  if (data.page && !data.total_results) return <h3>Oops! No movies found</h3>

  return (
    <>
      {data.results.map((item) => (
        <MovieItem key={item.id} {...item} />
      ))}
    </>
  )
}

export default MovieList
