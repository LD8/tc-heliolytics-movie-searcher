import { useEffect, useState } from 'react'

const useSearch = (value) => {
  const [searching, setSearching] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    let timer = null
    if (value) {
      timer = setTimeout(() => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=a99cc60fc2b34dbb18cb806b8a88ed14&query=${value}`

        setSearching(true)
        fetch(url)
          .then((res) => res.json())
          .then((data) => setData(data))
          .catch((errFetchingData) => console.log({ errFetchingData }))
          .finally(() => setSearching(false))
      }, 500)
      return () => timer && clearTimeout(timer)
    } else {
      setSearching(false)
      setData(undefined)
    }
  }, [value])

  return { searching, data }
}

export default useSearch
