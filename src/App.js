import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import useSearch from './hooks/useSearch'
import tmdb from './assets/tmdb.svg'

function App() {
  const [value, setValue] = useState('')
  const { searching, data } = useSearch(value)

  return (
    <div className='App'>
      <div className='searcher'>
        <div className='searcher-content'>
          <div className='tmdb'>
            <img src={tmdb} alt='TMDB' />
          </div>
          <div className='user-input'>
            <input
              placeholder='Search for a movie, tv series, a person ...'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='movie-list'>
        {value && <MovieList searching={searching} data={data} />}
      </div>
    </div>
  )
}

export default App
