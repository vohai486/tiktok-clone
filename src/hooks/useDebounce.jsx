import { useEffect, useState } from 'react'

function useDebounce(value, delay) {
  const [debouncededValue, setDebouncededValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncededValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncededValue
}

export default useDebounce
