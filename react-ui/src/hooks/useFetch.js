import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = ({ url, date = null, timeOut = 0 }) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = () => {
      axios.get(url)
        .then(res => {
          setResponse(res.data)
        })
        .catch(err => {
          console.dir(err)
          setError(err.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    // fetchData()
    console.log('fetching again')
    setTimeout(fetchData, timeOut)
  }, [url, date, timeOut])

  return { response, error, isLoading }
}

export default useFetch
