import { useCallback, useEffect, useState } from 'react'
import './App.css'
import MovieItem from './components/MovieItem'
import tmdb from './assets/tmdb.svg'
import puff from './assets/puff.svg'

function getMovies(value, page, cb) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=a99cc60fc2b34dbb18cb806b8a88ed14&query=${value}&page=${page}`
  return fetch(url)
    .then((res) => res.json())
    .then(cb)
    .catch((errFetchingData) => console.log({ errFetchingData }))
}

function App() {
  const [searching, setSearching] = useState(false)
  const [value, setValue] = useState('')
  const [list, setList] = useState()
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    let timer = null
    if (value) {
      timer = setTimeout(() => {
        setSearching(true)
        getMovies(value, page, ({ results: list, total_pages }) => {
          if (page > 1) {
            setList((prevList) => [...prevList, ...list])
          } else {
            setTotalPages(total_pages)
            setList(list)
          }
        }).finally(() => setSearching(false))
      }, 500)
      return () => timer && clearTimeout(timer)
    } else {
      setSearching(false)
    }
  }, [value, page])

  const handleInputChange = useCallback((e) => {
    setValue(e.target.value)
    setSearching(true)
    setPage(1)
    setTotalPages(1)
    setList(undefined)
  }, [])

  return (
    <div className='App'>
      <div className={`searcher ${value ? '' : 'flex1'}`}>
        <div className='searcher-content'>
          <div>
            <img height={30} src={tmdb} alt='TMDB' />
          </div>
          <div className='user-input'>
            <input
              placeholder='Search for a movie with apis of themoviedb.org ...'
              value={value}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className='movie-list'>
        {/* {page === 1 && searching && <h3>Searching...</h3>} */}
        {page === 1 && searching && (
          <img width={150} height={150} src={puff} alt='searching' />
        )}
        {value && !searching && !list?.length && (
          <h3>Oops! No movie found...</h3>
        )}
        {list?.map((item) => (
          <MovieItem key={item.id} {...item} />
        ))}
      </div>

      <div className={`more ${searching ? 'searching' : ''}`}>
        {list && totalPages > 1 && (
          <button
            onClick={() => {
              if (totalPages === page) {
                document.documentElement.scrollTop = 0
                document.body.scrollTop = 0
              } else {
                setPage((prev) => prev + 1)
                setSearching(true)
              }
            }}
          >
            {searching
              ? 'Loading ...'
              : totalPages === page
              ? 'Go back to top'
              : 'More'}
          </button>
        )}
      </div>
    </div>
  )
}

export default App
