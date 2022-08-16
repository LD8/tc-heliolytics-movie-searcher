import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import useSearch from './hooks/useSearch'

function App() {
  const [value, setValue] = useState('')
  const { searching, data } = useSearch(value)

  return (
    <div className='App'>
      <div className='ctn-user-input'>
        <input
          placeholder='Movie Searcher'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className='ctn-movie-list'>
        {value && <MovieList searching={searching} data={data} />}
      </div>
    </div>
  )
}

export default App
